import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { SyncModule } from './api/sync/sync.module';
import { HealthModule } from './api/health/health.module';

@Module({
  imports: [InfrastructureModule, SyncModule, HealthModule],
})
export class AppModule {}

