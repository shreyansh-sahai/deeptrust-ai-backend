import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { SyncModule } from './api/sync/sync.module';

@Module({
  imports: [InfrastructureModule, SyncModule],
})
export class AppModule {}

