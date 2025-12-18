import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { SyncModule } from '@api/sync/sync.module';
import { AuthController } from '@api/controllers/auth/auth.controller';
import { AuthService } from '@application/auth/services/auth.service';
import { HealthModule } from '@api/health/health.module';
import { IntentModule } from '@api/controllers/intent/intent.module';
import { ProfileModule } from '@api/controllers/profile/profile.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    InfrastructureModule,
    SyncModule,
    HealthModule,
    IntentModule,
    ProfileModule,
    JwtModule.register({
      global: true,
      secret: 'sJpPXkD+5fLJfph1z0yCqQmTsk+3e0A2tZT90pJ1mU0=',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule { }
