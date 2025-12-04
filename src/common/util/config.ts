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
}
