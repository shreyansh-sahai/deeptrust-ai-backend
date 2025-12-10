export class SyncLog {
  id: string;
  integrationAccountId?: string;
  syncStateId?: string;
  startTime: Date;
  endTime?: Date;
  durationMs?: number;
  status: string;
  triggerSource?: string;
  itemsFetched: number;
  itemsUpserted: number;
  itemsDeleted: number;
  errorCode?: string;
  errorMessage?: string;
  stackTrace?: string;
  meta: Record<string, any>;

  constructor(
    id: string,
    startTime: Date,
    status: string,
    itemsFetched: number,
    itemsUpserted: number,
    itemsDeleted: number,
    meta: Record<string, any>,
    integrationAccountId?: string,
    syncStateId?: string,
    endTime?: Date,
    durationMs?: number,
    triggerSource?: string,
    errorCode?: string,
    errorMessage?: string,
    stackTrace?: string,
  ) {
    this.id = id;
    this.integrationAccountId = integrationAccountId;
    this.syncStateId = syncStateId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.durationMs = durationMs;
    this.status = status;
    this.triggerSource = triggerSource;
    this.itemsFetched = itemsFetched;
    this.itemsUpserted = itemsUpserted;
    this.itemsDeleted = itemsDeleted;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.stackTrace = stackTrace;
    this.meta = meta;
  }
}
