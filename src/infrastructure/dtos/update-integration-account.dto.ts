export interface UpdateIntegrationAccountDto {
  accessTokenEnc?: string;
  refreshTokenEnc?: string;
  tokenExpiresAt?: Date;
  scopesGranted?: string[];
  status?: string;
  remoteEmail?: string;
}
