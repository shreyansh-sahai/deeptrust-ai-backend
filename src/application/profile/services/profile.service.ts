import { Injectable } from '@nestjs/common';
import { UserProfile } from '@domain/models/user-profile.model';

@Injectable()
export class ProfileService {
  async createProfile(
    userId: string,
    professionalHeadline?: string,
    professionalBio?: string,
    state?: string,
    city?: string,
    country?: string,
    timezone?: string,
    videoIntroductionURL?: string,
    mobileNumber?: string,
    linkedinUrl?: string,
  ): Promise<UserProfile> {
    console.log(`Creating profile for user ${userId}`);

    const mockProfile = new UserProfile(
      userId,
      new Date(),
      professionalHeadline,
      professionalBio,
      state,
      city,
      country,
      timezone,
      videoIntroductionURL,
      mobileNumber,
      linkedinUrl,
    );

    console.log('Profile created (stub - not saved to DB)');
    return mockProfile;
  }

  async updateProfile(
    userId: string,
    professionalHeadline?: string,
    professionalBio?: string,
    state?: string,
    city?: string,
    country?: string,
    timezone?: string,
    videoIntroductionURL?: string,
    mobileNumber?: string,
    linkedinUrl?: string,
  ): Promise<UserProfile> {
    console.log(`Updating profile for user ${userId}`);

    const mockProfile = new UserProfile(
      userId,
      new Date(),
      professionalHeadline || 'Updated Professional Headline',
      professionalBio || 'Updated professional bio',
      state,
      city,
      country,
      timezone,
      videoIntroductionURL,
      mobileNumber,
      linkedinUrl,
    );

    console.log('Profile updated (stub - not saved to DB)');
    return mockProfile;
  }
}
