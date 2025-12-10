import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { SyncService } from './sync.service';
import type { SyncProgressEvent } from './sync.service';
import { StartSyncDto, ResourceType } from './dto/start-sync.dto';
import { map } from 'rxjs/operators';

@Controller('api/sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  /**
   * Start a sync operation and stream progress via Server-Sent Events (SSE)
   * Supports: contacts, calendar, email
   */
  @Post('start')
  @UsePipes(new ValidationPipe({ transform: true }))
  async startSync(@Body() dto: StartSyncDto, @Res() res: Response) {
    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering

    const stream = await this.syncService.startSync(
      dto.integrationAccountId,
      dto.resourceType,
    );

    stream
      .pipe(
        map((event: SyncProgressEvent) => {
          // Format as SSE
          return `data: ${JSON.stringify(event)}\n\n`;
        }),
      )
      .subscribe({
        next: (data) => {
          res.write(data);
        },
        error: (error) => {
          res.write(
            `data: ${JSON.stringify({
              type: 'error',
              data: { error: error.message },
            })}\n\n`,
          );
          res.end();
        },
        complete: () => {
          res.end();
        },
      });

    // Handle client disconnect
    res.on('close', () => {
      res.end();
    });
  }

  /**
   * Get current sync status
   */
  @Get('status/:integrationAccountId/:resourceType')
  async getSyncStatus(
    @Param('integrationAccountId') integrationAccountId: string,
    @Param('resourceType') resourceType: ResourceType,
  ) {
    return this.syncService.getSyncStatus(integrationAccountId, resourceType);
  }

  /**
   * Get sync history for an integration account
   */
  @Get('history/:integrationAccountId')
  async getSyncHistory(
    @Param('integrationAccountId') integrationAccountId: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.syncService.getSyncHistory(integrationAccountId, limitNum);
  }
}

