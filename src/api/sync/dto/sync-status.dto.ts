export class SyncStatusDto {
  syncState: {
    id: string;
    resourceType: string;
    resourceId: string;
    syncToken: string | null;
    historyId: string | null;
    currentPageToken: string | null;
    lastSyncedAt: Date | null;
    lastSuccessAt: Date | null;
    lastAttemptStatus: string;
    fullSyncRequired: boolean;
  } | null;

  lastSyncLog: {
    id: string;
    status: string;
    startTime: Date;
    endTime: Date | null;
    durationMs: number | null;
    itemsFetched: number;
    itemsUpserted: number;
    itemsDeleted: number;
    errorCode: string | null;
    errorMessage: string | null;
  } | null;

  isRunning: boolean;
}

