import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { ResourceType } from './dto/start-sync.dto';
import { SyncStatusDto } from './dto/sync-status.dto';
import { spawn } from 'child_process';
import { join } from 'path';
import { Observable, Subject } from 'rxjs';

export interface SyncProgressEvent {
  type: 'status' | 'progress' | 'complete' | 'error';
  data: {
    status?: string;
    message?: string;
    itemsFetched?: number;
    itemsUpserted?: number;
    itemsDeleted?: number;
    error?: string;
    durationMs?: number;
  };
}

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  private readonly runningSyncs = new Map<string, Subject<SyncProgressEvent>>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Start a sync operation and return an Observable stream of progress events
   */
  async startSync(
    integrationAccountId: string,
    resourceType: ResourceType,
  ): Promise<Observable<SyncProgressEvent>> {
    const syncKey = `${integrationAccountId}:${resourceType}`;

    // Check if sync is already running
    if (this.runningSyncs.has(syncKey)) {
      this.logger.warn(`Sync already running for ${syncKey}`);
      return this.runningSyncs.get(syncKey)!.asObservable();
    }

    // Verify integration account exists and is active
    const account = await this.prisma.integrationAccount.findUnique({
      where: { id: integrationAccountId },
      include: { integration: true },
    });

    if (!account) {
      throw new NotFoundException(`Integration account ${integrationAccountId} not found`);
    }

    if (account.status !== 'active') {
      throw new Error(`Integration account status is ${account.status}, cannot sync`);
    }

    // Create event subject for this sync
    const eventSubject = new Subject<SyncProgressEvent>();
    this.runningSyncs.set(syncKey, eventSubject);

    // Emit initial status
    eventSubject.next({
      type: 'status',
      data: {
        status: 'running',
        message: `Starting ${resourceType} sync...`,
      },
    });

    // Start Python sync process
    this.executeSyncProcess(integrationAccountId, resourceType, eventSubject)
      .then(() => {
        this.logger.log(`Sync completed for ${syncKey}`);
      })
      .catch((error) => {
        this.logger.error(`Sync failed for ${syncKey}:`, error);
        eventSubject.next({
          type: 'error',
          data: {
            status: 'failed',
            error: error.message,
          },
        });
      })
      .finally(() => {
        eventSubject.complete();
        this.runningSyncs.delete(syncKey);
      });

    return eventSubject.asObservable();
  }

  /**
   * Execute the Python sync process and stream progress
   */
  private async executeSyncProcess(
    integrationAccountId: string,
    resourceType: ResourceType,
    eventSubject: Subject<SyncProgressEvent>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Path to Python sync CLI script
      const pythonScriptPath = join(
        process.cwd(),
        '..',
        'deeptrust-data-pipeline',
        'src',
        'runners',
        'sync_cli.py',
      );

      // Prepare config as JSON
      const config = {
        integration_account_id: integrationAccountId,
        trigger_source: 'api',
        resource_type: resourceType,
        stream_progress: true,
      };

      // Spawn Python process with config as JSON argument
      const pythonProcess = spawn('python3', [pythonScriptPath, JSON.stringify(config)], {
        cwd: join(process.cwd(), '..', 'deeptrust-data-pipeline'),
      });

      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        const lines = stdout.split('\n');
        stdout = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const event = JSON.parse(line);
              eventSubject.next(event as SyncProgressEvent);
            } catch (error) {
              this.logger.warn(`Failed to parse progress line: ${line}`);
            }
          }
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        this.logger.error(`Python stderr: ${data.toString()}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Python process exited with code ${code}: ${stderr}`));
        }
      });

      pythonProcess.on('error', (error) => {
        reject(new Error(`Failed to start Python process: ${error.message}`));
      });
    });
  }

  /**
   * Get sync status for an integration account and resource type
   */
  async getSyncStatus(
    integrationAccountId: string,
    resourceType: ResourceType,
  ): Promise<SyncStatusDto> {
    const syncState = await this.prisma.syncState.findUnique({
      where: {
        integrationAccountId_resourceType_resourceId: {
          integrationAccountId,
          resourceType,
          resourceId: 'default',
        },
      },
    });

    const lastSyncLog = await this.prisma.syncLog.findFirst({
      where: {
        integrationAccountId,
        syncStateId: syncState?.id,
      },
      orderBy: {
        startTime: 'desc',
      },
    });

    const syncKey = `${integrationAccountId}:${resourceType}`;
    const isRunning = this.runningSyncs.has(syncKey);

    return {
      syncState: syncState
        ? {
            id: syncState.id,
            resourceType: syncState.resourceType,
            resourceId: syncState.resourceId,
            syncToken: syncState.syncToken,
            historyId: syncState.historyId,
            currentPageToken: syncState.currentPageToken,
            lastSyncedAt: syncState.lastSyncedAt,
            lastSuccessAt: syncState.lastSuccessAt,
            lastAttemptStatus: syncState.lastAttemptStatus,
            fullSyncRequired: syncState.fullSyncRequired,
          }
        : null,
      lastSyncLog: lastSyncLog
        ? {
            id: lastSyncLog.id,
            status: lastSyncLog.status,
            startTime: lastSyncLog.startTime,
            endTime: lastSyncLog.endTime,
            durationMs: lastSyncLog.durationMs,
            itemsFetched: lastSyncLog.itemsFetched,
            itemsUpserted: lastSyncLog.itemsUpserted,
            itemsDeleted: lastSyncLog.itemsDeleted,
            errorCode: lastSyncLog.errorCode,
            errorMessage: lastSyncLog.errorMessage,
          }
        : null,
      isRunning,
    };
  }

  /**
   * Get sync history for an integration account
   */
  async getSyncHistory(integrationAccountId: string, limit: number = 10) {
    const logs = await this.prisma.syncLog.findMany({
      where: {
        integrationAccountId,
      },
      orderBy: {
        startTime: 'desc',
      },
      take: limit,
      include: {
        syncState: {
          select: {
            resourceType: true,
            resourceId: true,
          },
        },
      },
    });

    const total = await this.prisma.syncLog.count({
      where: {
        integrationAccountId,
      },
    });

    return {
      logs: logs.map((log) => ({
        id: log.id,
        status: log.status,
        startTime: log.startTime,
        endTime: log.endTime,
        durationMs: log.durationMs,
        itemsFetched: log.itemsFetched,
        itemsUpserted: log.itemsUpserted,
        itemsDeleted: log.itemsDeleted,
        errorCode: log.errorCode,
        errorMessage: log.errorMessage,
        resourceType: log.syncState?.resourceType,
        triggerSource: log.triggerSource,
      })),
      total,
    };
  }
}

