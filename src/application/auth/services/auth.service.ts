import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Config } from '../../../common/util/config';

@Injectable()
export class AuthService {
  private clientId = Config.COGNITO_CLIENT_ID;
  private clientSecret = Config.COGNITO_CLIENT_SECRET;
  private domain = Config.COGNITO_DOMAIN;
  private redirectUri = Config.COGNITO_REDIRECT_URI;

  /**
   * Exchange Authorization Code → Tokens
   */
  async exchangeCodeForTokens(code: string, userId: string) {
    const tokenUrl = `${this.domain}/oauth2/token`;

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', this.clientId || '');
    data.append('redirect_uri', this.redirectUri || '');
    data.append('code', code);

    try {
      const response = await axios.post(tokenUrl, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      const { access_token, refresh_token, expires_in, id_token } = response.data;

      // await this.saveUserTokens(userId, access_token, refresh_token, expires_in);

      return { access_token, refresh_token, id_token, expires_in };
    } catch (err: any) {
      console.error('Token exchange error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.error_description || err.response?.data?.error || 'Failed to exchange authorization code';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
