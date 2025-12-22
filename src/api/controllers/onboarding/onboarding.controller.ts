import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OnboardingService } from "@application/onboarding/services/onboarding.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";
import { AddIntentDto } from "../intent/dto/add-intent.dto";
import { IntentResponseDto } from "../intent/dto/intent-response.dto";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { AddProfileDto } from "../profile/dto/add-profile.dto";

@ApiTags('onboarding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
    path: 'onboarding',
    version: '1',
})
export class OnboardingController {
    constructor(private readonly onboardingService: OnboardingService) { }

    @Post('save-intent')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'Create a new intent for a user' })
    @ApiBody({ type: AddIntentDto })
    @ApiResponse({
        status: 201,
        description: 'Intent created successfully',
        type: IntentResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data',
    })
    async addIntent(
        @CurrentUser('sub') userId: string,
        @Body() dto: AddIntentDto,
    ): Promise<IntentResponseDto> {
        const intent = await this.onboardingService.createIntent(
            userId,
            dto.goalTitle,
            dto.goalDescription,
            dto.metadata,
            dto.voiceFileLink,
        );

        return {
            id: intent.id,
            goalTitle: intent.goalTitle,
            goalDescription: intent.goalDescription,
            metadata: intent.metadata,
            createdAt: intent.createdAt,
            updatedAt: intent.updatedAt,
        };
    }

    @Post('save-step-2')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'Save Step 2' })
    @ApiResponse({
        status: 201,
        description: 'Step 2 saved successfully',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data',
    })
    async step2(
        @CurrentUser('sub') userId: string,
    ): Promise<boolean> {
        return await this.onboardingService.step2(
            userId,
        );
    }

    @Post('complete-onboarding')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'Complete onboarding' })
    @ApiResponse({
        status: 201,
        description: 'Onboarding completed successfully',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data',
    })
    async completeOnboarding(
        @CurrentUser('sub') userId: string,
        @Body() dto: AddProfileDto,
    ): Promise<boolean> {
        return await this.onboardingService.completeOnboarding(
            userId,
            dto.professionalHeadline,
            dto.professionalBio,
            dto.currentOrganization,
            dto.state,
            dto.city,
            dto.country,
            dto.timezone,
            dto.videoIntroductionURL,
            dto.mobileNumber,
            dto.linkedinUrl,
        );
    }
}