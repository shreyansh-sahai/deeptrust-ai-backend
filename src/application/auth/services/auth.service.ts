import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Config } from '@common/util/config';
import { JwtUtil } from '@common/util/jwt.util';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { IntegrationRepository } from '@infrastructure/repositories/integration.repository';
import { IntegrationAccountRepository } from '@infrastructure/repositories/integration-account.repository';

@Injectable()
export class AuthService {
  private clientId = Config.COGNITO_CLIENT_ID;
  private clientSecret = Config.COGNITO_CLIENT_SECRET;
  private domain = Config.COGNITO_DOMAIN;
  private redirectUri = Config.COGNITO_REDIRECT_URI;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationAccountRepository: IntegrationAccountRepository,
  ) {}

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

      const { access_token, refresh_token, expires_in, id_token } =
        response.data;

      // const userInfo = JwtUtil.decodeIdToken(id_token);
      // const tokenExpiry = JwtUtil.calculateTokenExpiry(expires_in);

      //let user = await this.userRepository.findByEmail(userInfo.email);

      // if (user) {
      //   await this.handleExistingUser(
      //     user.id,
      //     provider,
      //     userInfo.sub,
      //     userInfo.email,
      //     access_token,
      //     refresh_token,
      //     tokenExpiry,
      //   );
      // } else {
      //   user = await this.handleNewUser(
      //     userInfo.email,
      //     userInfo.name,
      //     provider,
      //     userInfo.sub,
      //     access_token,
      //     refresh_token,
      //     tokenExpiry,
      //   );
      // }

      return {
        access_token,
        refresh_token,
        id_token,
        expires_in
      };
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

  private async handleExistingUser(
    userId: string,
    provider: string,
    remoteProviderId: string,
    remoteEmail: string,
    accessToken: string,
    refreshToken: string,
    tokenExpiry: Date,
  ): Promise<void> {
    // const integration = await this.integrationRepository.findByProvider(
    //   provider,
    // );

    // if (!integration) {
    //   throw new HttpException(
    //     `Integration not found for provider: ${provider}`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // const existingAccount =
    //   await this.integrationAccountRepository.findByUserAndIntegration(
    //     userId,
    //     integration.id,
    //   );

    // if (existingAccount) {
    //   await this.integrationAccountRepository.update(existingAccount.id, {
    //     accessTokenEnc: accessToken,
    //     refreshTokenEnc: refreshToken,
    //     tokenExpiresAt: tokenExpiry,
    //     remoteEmail,
    //     status: 'active',
    //   });
    // } else {
    //   await this.integrationAccountRepository.create({
    //     userId,
    //     integrationId: integration.id,
    //     remoteProviderId,
    //     remoteEmail,
    //     accessTokenEnc: accessToken,
    //     refreshTokenEnc: refreshToken,
    //     tokenExpiresAt: tokenExpiry,
    //     scopesGranted: integration.requiredScopes,
    //   });
    // }
    
  }

  private async handleNewUser(
    email: string,
    fullName: string | undefined,
    provider: string,
    remoteProviderId: string,
    accessToken: string,
    refreshToken: string,
    tokenExpiry: Date,
  ) {
    // const user = await this.userRepository.create(email, fullName);

    // const integration = await this.integrationRepository.findByProvider(
    //   provider,
    // );

    // if (!integration) {
    //   throw new HttpException(
    //     `Integration not found for provider: ${provider}`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // await this.integrationAccountRepository.create({
    //   userId: user.id,
    //   integrationId: integration.id,
    //   remoteProviderId,
    //   remoteEmail: email,
    //   accessTokenEnc: accessToken,
    //   refreshTokenEnc: refreshToken,
    //   tokenExpiresAt: tokenExpiry,
    //   scopesGranted: integration.requiredScopes,
    // });

    // return user;
  }
}
