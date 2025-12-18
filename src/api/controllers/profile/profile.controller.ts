import {
  Controller,
  Post,
  Put,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ProfileService } from '@application/profile/services/profile.service';
import { AddProfileDto } from './dto/add-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';

@ApiTags('profile')
@Controller('api/profile')
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
  async addProfile(@Body() dto: AddProfileDto): Promise<ProfileResponseDto> {
    const profile = await this.profileService.createProfile(
      dto.userId,
      dto.professionalHeadline,
      dto.professionalBio,
      dto.state,
      dto.city,
      dto.country,
      dto.timezone,
      dto.videoIntroductionURL,
      dto.mobileNumber,
      dto.linkedinUrl,
    );

    return {
      userId: profile.userId,
      professionalHeadline: profile.professionalHeadline,
      professionalBio: profile.professionalBio,
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
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const profile = await this.profileService.updateProfile(
      dto.userId,
      dto.professionalHeadline,
      dto.professionalBio,
      dto.state,
      dto.city,
      dto.country,
      dto.timezone,
      dto.videoIntroductionURL,
      dto.mobileNumber,
      dto.linkedinUrl,
    );

    return {
      userId: profile.userId,
      professionalHeadline: profile.professionalHeadline,
      professionalBio: profile.professionalBio,
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
}
