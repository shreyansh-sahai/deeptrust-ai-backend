import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProfileService } from '@application/profile/services/profile.service';
import { AddProfileDto } from './dto/add-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { SaveWorkExperienceDto, WorkExperienceItemDto } from './dto/work-experience.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'profile',
  version: '1',
})
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('add')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new user profile' })
  @ApiBody({ type: AddProfileDto })
  @ApiResponse({
    status: 201,
    description: 'Profile created successfully',
    type: ProfileResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async addProfile(
    @CurrentUser('sub') userId: string,
    @Body() dto: AddProfileDto,
  ): Promise<ProfileResponseDto> {
    const profile = await this.profileService.createProfile(
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

    return {
      professionalHeadline: profile.professionalHeadline,
      professionalBio: profile.professionalBio,
      currentOrganization: profile.currentOrganization,
      state: profile.state,
      city: profile.city,
      country: profile.country,
      timezone: profile.timezone,
      videoIntroductionURL: profile.videoIntroductionURL,
      mobileNumber: profile.mobileNumber,
      linkedinUrl: profile.linkedinUrl,
      updatedAt: profile.updatedAt,
    };
  }

  @Put('update')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update an existing user profile' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: ProfileResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found',
  })
  async updateProfile(
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const profile = await this.profileService.updateProfile(
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

    return {
      professionalHeadline: profile.professionalHeadline,
      professionalBio: profile.professionalBio,
      currentOrganization: profile.currentOrganization,
      state: profile.state,
      city: profile.city,
      country: profile.country,
      timezone: profile.timezone,
      videoIntroductionURL: profile.videoIntroductionURL,
      mobileNumber: profile.mobileNumber,
      linkedinUrl: profile.linkedinUrl,
      updatedAt: profile.updatedAt,
    };
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    type: ProfileResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found',
  })
  async getProfile(
    @CurrentUser('sub') userId: string,
  ): Promise<ProfileResponseDto> {
    const profile = await this.profileService.getProfileByUserId(userId);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return {
      professionalHeadline: profile.professionalHeadline,
      professionalBio: profile.professionalBio,
      currentOrganization: profile.currentOrganization,
      state: profile.state,
      city: profile.city,
      country: profile.country,
      timezone: profile.timezone,
      videoIntroductionURL: profile.videoIntroductionURL,
      mobileNumber: profile.mobileNumber,
      linkedinUrl: profile.linkedinUrl,
      updatedAt: profile.updatedAt,
    };
  }

  @Post('work-ex/save')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Save or update user work experience' })
  @ApiBody({ type: SaveWorkExperienceDto })
  @ApiResponse({
    status: 201,
    description: 'Work experience saved successfully',
  })
  async saveWorkExperience(
    @CurrentUser('sub') userId: string,
    @Body() dto: SaveWorkExperienceDto,
  ): Promise<any> {
    await this.profileService.saveWorkExperience(userId, dto.experience);
    return { message: 'Work experience saved successfully' };
  }

  @Get('work-ex/get')
  @ApiOperation({ summary: 'Get user work experience' })
  @ApiResponse({
    status: 200,
    description: 'Work experience retrieved successfully',
    type: [WorkExperienceItemDto],
  })
  async getWorkExperience(
    @CurrentUser('sub') userId: string,
  ): Promise<WorkExperienceItemDto[]> {
    return await this.profileService.getWorkExperience(userId);
  }
}
