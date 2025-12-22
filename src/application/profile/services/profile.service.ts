import { Injectable } from '@nestjs/common';
import { UserProfile } from '@domain/models/user-profile.model';
import { UserProfileRepository } from '@infrastructure/repositories/user-profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: UserProfileRepository) {}

  async createProfile(
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
  ): Promise<UserProfile> {
    const profile = new UserProfile(
      userId,
      new Date(),
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

    return await this.profileRepository.save(profile);
  }

  async updateProfile(
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
  ): Promise<UserProfile> {
    const existingProfile = await this.profileRepository.findByUserId(userId);

    const profile = new UserProfile(
      userId,
      new Date(),
      professionalHeadline ?? existingProfile?.professionalHeadline,
      professionalBio ?? existingProfile?.professionalBio,
      currentOrganization ?? existingProfile?.currentOrganization,
      state ?? existingProfile?.state,
      city ?? existingProfile?.city,
      country ?? existingProfile?.country,
      timezone ?? existingProfile?.timezone,
      videoIntroductionURL ?? existingProfile?.videoIntroductionURL,
      mobileNumber ?? existingProfile?.mobileNumber,
      linkedinUrl ?? existingProfile?.linkedinUrl,
    );

    return await this.profileRepository.save(profile);
  }

  async getProfileByUserId(userId: string): Promise<UserProfile | null> {
    return await this.profileRepository.findByUserId(userId);
  }
}
