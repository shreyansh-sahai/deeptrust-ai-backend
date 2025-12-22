import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from '@application/onboarding/services/onboarding.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
    imports: [InfrastructureModule],
    controllers: [OnboardingController],
    providers: [OnboardingService],
})
export class OnboardingModule { }
