import { IntentService } from "@application/intent/services/intent.service";
import { Intent } from "@domain/models/intent.model";
import { ProfileService } from "@application/profile/services/profile.service";
import { UserRepository } from "@infrastructure/repositories/user.repository";

export class OnboardingService {
    constructor(
        private readonly intentService: IntentService,
        private readonly profileService: ProfileService,
        private readonly userRepository: UserRepository
    ) { }

    async createIntent(
        userId: string,
        goalTitle: string,
        goalDescription: string,
        metadata: Record<string, any>,
        voiceFileLink?: string | null,
    ): Promise<Intent> {
        const intent = await this.intentService.createIntent(
            userId,
            goalTitle,
            goalDescription,
            metadata,
            voiceFileLink,
        );

        await this.userRepository.updateUserOnboardingStep(userId, { metadata: { isOnboarded: false, onboardingStep: 1 } });
        return intent;
    }

    async step2(
        userId: string,
    ): Promise<boolean> {
        await this.userRepository.updateUserOnboardingStep(userId, { metadata: { isOnboarded: false, onboardingStep: 2 } });
        return true;
    }

    async completeOnboarding(
        userId: string,
        professionalHeadline?: string,
        professionalBio?: string,
        currentOrganization?: string,
        state?: string,
        city?: string,
        country?: string,
        timezone?: string,
        videoIntroductionURL?: string,
        mobileNumber?: string,
        linkedinUrl?: string,
    ): Promise<boolean> {
        await this.profileService.createProfile(
            userId,
            professionalHeadline,
            professionalBio,
            currentOrganization,
            state,
            city,
            country,
            timezone,
            videoIntroductionURL,
            mobileNumber,
            linkedinUrl,
        );
        await this.userRepository.updateUserOnboardingStep(userId, { metadata: { isOnboarded: true, onboardingStep: 2 } });
        return true;
    }
}