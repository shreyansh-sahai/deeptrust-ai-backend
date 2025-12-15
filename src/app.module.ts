import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { SyncModule } from '@api/sync/sync.module';
import { AuthController } from '@api/controllers/auth/auth.controller';
import { AuthService } from '@application/auth/services/auth.service';
import { HealthModule } from '@api/health/health.module';

@Module({
  imports: [InfrastructureModule, SyncModule, HealthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
