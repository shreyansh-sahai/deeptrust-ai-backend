import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from '@application/onboarding/services/onboarding.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { IntentModule } from '../intent/intent.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
    imports: [InfrastructureModule, IntentModule, ProfileModule],
    controllers: [OnboardingController],
    providers: [OnboardingService],
})
export class OnboardingModule { }
