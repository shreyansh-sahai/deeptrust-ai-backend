import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Config } from '@common/util/config';
import { JwtUtil } from '@common/util/jwt.util';
import { CryptoUtil } from '@common/util/crypto.util';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { IntegrationRepository } from '@infrastructure/repositories/integration.repository';
import { IntegrationAccountRepository } from '@infrastructure/repositories/integration-account.repository';
import { ContactRepository } from '@infrastructure/repositories/contact.repository';
import { User } from '@domain/models/user.model';

@Injectable()
export class AuthService {
  private clientId = Config.COGNITO_CLIENT_ID;
  private domain = Config.COGNITO_DOMAIN;
  private redirectUri = Config.COGNITO_REDIRECT_URI;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationAccountRepository: IntegrationAccountRepository,
    private readonly jwtService: JwtService,
    private readonly contactRepository: ContactRepository,
  ) { }

  async exchangeCodeForTokens(code: string, provider: string) {
    const tokenUrl = `${this.domain}/oauth2/token`;

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', this.clientId || '');
    data.append('redirect_uri', this.redirectUri || '');
    data.append('code', code);

    try {
      const response = await axios.post(tokenUrl, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const { expires_in, id_token } = response.data;

      const userInfo = JwtUtil.decodeIdToken(id_token);
      // if (!provider || provider === undefined)
      provider = userInfo.provider;

      const tokenExpiry = JwtUtil.calculateTokenExpiry(expires_in);

      let scopes = await this.fetchTokenScopes(provider, userInfo.access_token);

      let user = await this.userRepository.findByEmail(userInfo.email);
      if (user) {
        await this.handleExistingUser(
          user,
          provider,
          userInfo.sub,
          userInfo.email,
          userInfo.access_token || '',
          userInfo.refresh_token || '',
          tokenExpiry,
          scopes,
          userInfo
        );
      } else {
        user = await this.handleNewUser(
          userInfo.email,
          userInfo.name,
          provider,
          userInfo.sub,
          userInfo.access_token || '',
          userInfo.refresh_token || '',
          tokenExpiry,
          scopes,
          userInfo
        );
      }

      var sessionToken = await this.createSessionToken({
        sub: user.id,
        email: userInfo.email,
        provider: 'cognito',
      });

      const code = JSON.stringify({
        token: sessionToken,
        isOnboarded: false,
        onboardingStep: 1,
      });

      return code;

    } catch (err: any) {
      console.error('Token exchange error:', err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.error_description ||
        err.response?.data?.error ||
        err.message ||
        'Failed to exchange authorization code';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  private async fetchTokenScopes(provider: string, accessToken?: string) {
    if (accessToken != undefined) {
      try {
        if (provider === 'Google') {
          const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
          const scopes = response.data.scope.split(' ');
          return scopes;
        }
        else if (provider === 'Microsoft') {
          // const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
          // });
          const microsoftScope = 'Contacts.Read Mail.Read Calendars.Read';
          const scopes = microsoftScope.split(' ');
          return scopes;
        }
      }
      catch (err: any) {
        console.error('Token scope error:', err.response?.data || err.message);
      }
    }
  }

  private async handleExistingUser(
    user: User,
    provider: string,
    remoteProviderId: string,
    remoteEmail: string,
    accessToken: string,
    refreshToken: string,
    tokenExpiry: Date,
    scopes: string[],
    userInfo: any,
  ): Promise<void> {

    if (!user.contactId) {
      let contact = await this.contactRepository.findByEmail(remoteEmail);
      if (!contact) {
        contact = await this.contactRepository.create({
          email: remoteEmail,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          displayName: userInfo.name,
          phoneNumber: userInfo.phone_number,
          organization: userInfo.organization,
          jobTitle: userInfo.job_title,
          notes: userInfo.notes,
          photoUrl: userInfo.picture,
        });

        await this.userRepository.update(user.id, {
          contactId: contact.id,
        });
      }
    }

    scopes.forEach(async scope => {
      const slug = provider + ' - ' + scope;
      let integration = await this.integrationRepository.findBySlug(slug);

      if (!integration) {
        integration = await this.integrationRepository.create(
          {
            slug: slug,
            name: slug,
            provider: provider,
            isGlobalEnabled: true,
            requiredScopes: [scope],
            authBaseUrl: '',
            tokenUrl: '',
          }
        );
      }

      let integrationAccount = await this.integrationAccountRepository.findByUserAndIntegration(user.id, integration.id);
      if (!integrationAccount) {
        await this.integrationAccountRepository.create({
          userId: user.id,
          integrationId: integration.id,
          remoteProviderId,
          remoteEmail,
          accessTokenEnc: CryptoUtil.encrypt(accessToken),
          refreshTokenEnc: CryptoUtil.encrypt(refreshToken),
          tokenExpiresAt: tokenExpiry,
          scopesGranted: integration.requiredScopes,
        });
      }
      else {
        await this.integrationAccountRepository.update(integrationAccount.id, {
          accessTokenEnc: CryptoUtil.encrypt(accessToken),
          refreshTokenEnc: CryptoUtil.encrypt(refreshToken),
          tokenExpiresAt: tokenExpiry,
          scopesGranted: integration.requiredScopes,
        });
      }
    });
  }



  private async handleNewUser(
    email: string,
    fullName: string | undefined,
    provider: string,
    remoteProviderId: string,
    accessToken: string,
    refreshToken: string,
    tokenExpiry: Date,
    scopes: string[],
    userInfo: any,
  ) {
    const user = await this.userRepository.create(email, fullName);

    let contact = await this.contactRepository.findByEmail(email);
    if (!contact) {
      contact = await this.contactRepository.create({
        email: email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        displayName: userInfo.name,
        phoneNumber: userInfo.phone_number,
        organization: userInfo.organization,
        jobTitle: userInfo.job_title,
        notes: userInfo.notes,
        photoUrl: userInfo.picture,
      });

      await this.userRepository.update(user.id, {
        contactId: contact.id,
      });
    }

    scopes.forEach(async scope => {
      const slug = provider + ' - ' + scope;
      let integration = await this.integrationRepository.findBySlug(slug);

      if (!integration) {
        integration = await this.integrationRepository.create(
          {
            slug: slug,
            name: slug,
            provider: provider,
            isGlobalEnabled: true,
            requiredScopes: [scope],
            authBaseUrl: '',
            tokenUrl: '',
          }
        );
      }

      let integrationAccount = await this.integrationAccountRepository.findByUserAndIntegration(user.id, integration.id);
      if (!integrationAccount) {
        await this.integrationAccountRepository.create({
          userId: user.id,
          integrationId: integration.id,
          remoteProviderId,
          remoteEmail: email,
          accessTokenEnc: CryptoUtil.encrypt(accessToken),
          refreshTokenEnc: CryptoUtil.encrypt(refreshToken),
          tokenExpiresAt: tokenExpiry,
          scopesGranted: integration.requiredScopes,
        });
      }
      else {
        await this.integrationAccountRepository.update(integrationAccount.id, {
          accessTokenEnc: CryptoUtil.encrypt(accessToken),
          refreshTokenEnc: CryptoUtil.encrypt(refreshToken),
          tokenExpiresAt: tokenExpiry,
          scopesGranted: integration.requiredScopes,
        });
      }
    });
    return user;
  }

  private async createSessionToken(payload: {
    sub: string;
    email?: string;
    provider: string;
  }) {
    return this.jwtService.sign(payload, {
      secret: 'sJpPXkD+5fLJfph1z0yCqQmTsk+3e0A2tZT90pJ1mU0=',
      expiresIn: '1d'
    });
  }
}
