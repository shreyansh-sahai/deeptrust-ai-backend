import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthModule as InfrastructureHealthModule } from '@infrastructure/health/health.module';

@Module({
  imports: [InfrastructureHealthModule],
  controllers: [HealthController],
})
export class HealthModule {}
