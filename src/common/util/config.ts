import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static get(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Config error: missing required env variable ${key}`);
    }
    return value;
  }

  static get databaseUrl(): string {
    return this.get('DATABASE_URL');
  }

  static get COGNITO_CLIENT_ID(): string {
    return this.get('COGNITO_CLIENT_ID');
  }

  static get COGNITO_CLIENT_SECRET(): string {
    return this.get('COGNITO_CLIENT_SECRET');
  }
  static get COGNITO_DOMAIN(): string {
    return this.get('COGNITO_DOMAIN');
  }
  static get COGNITO_REDIRECT_URI(): string {
    return this.get('COGNITO_REDIRECT_URI');
  }

  static get FRONTEND_SUCCESS_URL(): string {
    return 'https://staging.mydeeptrust.ai/auth/callback';
  }

  static get DATA_PIPELINE_API_URL(): string {
    return 'https://data.dev.mydeeptrust.ai/';
  }

  static get ENCRYPTION_KEY(): string {
    return 'change-this-to-a-secure-random-key-in-production'
  };
}
