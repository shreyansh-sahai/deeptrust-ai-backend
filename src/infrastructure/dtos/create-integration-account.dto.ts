export interface CreateIntegrationAccountDto {
  userId: string;
  integrationId: string;
  remoteProviderId: string;
  remoteEmail?: string;
  accessTokenEnc: string;
  refreshTokenEnc: string;
  tokenExpiresAt: Date;
  scopesGranted: string[];
}
