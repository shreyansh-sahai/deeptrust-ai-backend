export class SyncState {
  id: string;
  integrationAccountId: string;
  resourceType: string;
  resourceId: string;
  syncToken?: string;
  historyId?: string;
  currentPageToken?: string;
  lastSyncedAt?: Date;
  lastSuccessAt?: Date;
  lastAttemptStatus: string;
  fullSyncRequired: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    integrationAccountId: string,
    resourceType: string,
    resourceId: string,
    lastAttemptStatus: string,
    fullSyncRequired: boolean,
    createdAt: Date,
    updatedAt: Date,
    syncToken?: string,
    historyId?: string,
    currentPageToken?: string,
    lastSyncedAt?: Date,
    lastSuccessAt?: Date,
  ) {
    this.id = id;
    this.integrationAccountId = integrationAccountId;
    this.resourceType = resourceType;
    this.resourceId = resourceId;
    this.syncToken = syncToken;
    this.historyId = historyId;
    this.currentPageToken = currentPageToken;
    this.lastSyncedAt = lastSyncedAt;
    this.lastSuccessAt = lastSuccessAt;
    this.lastAttemptStatus = lastAttemptStatus;
    this.fullSyncRequired = fullSyncRequired;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
