export class IntegrationAccount {
  id: string;
  userId: string;
  integrationId: string;
  remoteProviderId: string;
  remoteEmail?: string;
  accessTokenEnc: string;
  refreshTokenEnc: string;
  tokenExpiresAt: Date;
  scopesGranted: string[];
  status: string;
  lastErrorMessage?: string;
  disconnectReason?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    integrationId: string,
    remoteProviderId: string,
    accessTokenEnc: string,
    refreshTokenEnc: string,
    tokenExpiresAt: Date,
    scopesGranted: string[],
    status: string,
    createdAt: Date,
    updatedAt: Date,
    remoteEmail?: string,
    lastErrorMessage?: string,
    disconnectReason?: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.integrationId = integrationId;
    this.remoteProviderId = remoteProviderId;
    this.remoteEmail = remoteEmail;
    this.accessTokenEnc = accessTokenEnc;
    this.refreshTokenEnc = refreshTokenEnc;
    this.tokenExpiresAt = tokenExpiresAt;
    this.scopesGranted = scopesGranted;
    this.status = status;
    this.lastErrorMessage = lastErrorMessage;
    this.disconnectReason = disconnectReason;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
