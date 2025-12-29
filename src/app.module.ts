import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { AuthController } from '@api/controllers/auth/auth.controller';
import { AuthService } from '@application/auth/services/auth.service';
import { HealthModule } from '@api/health/health.module';
import { ProfileModule } from '@api/controllers/profile/profile.module';
import { OnboardingModule } from '@api/controllers/onboarding/onboarding.module';
import { NetworkModule } from '@api/controllers/network/network.module';
import { IntentModule } from '@api/controllers/intent/intent.module';
import { ContactModule } from '@api/controllers/contact/contact.module';
import { JwtModule } from '@nestjs/jwt';
import { StreamService } from '@application/auth/services/streamService.service';
import { IdentitiesModule } from '@api/controllers/identities/identities.module';


@Module({
  imports: [
    InfrastructureModule,
    HealthModule,
    ProfileModule,
    OnboardingModule,
    NetworkModule,
    IntentModule,
    ContactModule,
    IdentitiesModule,
    JwtModule.register({
      global: true,
      secret: 'sJpPXkD+5fLJfph1z0yCqQmTsk+3e0A2tZT90pJ1mU0=',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, StreamService],
})
export class AppModule { }
