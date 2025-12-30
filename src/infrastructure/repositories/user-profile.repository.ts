import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserProfile } from '@domain/models/user-profile.model';

@Injectable()
export class UserProfileRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findByUserId(userId: string): Promise<UserProfile | null> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) return null;

    return new UserProfile(
      profile.userId,
      profile.updatedAt,
      profile.professionalHeadline ?? undefined,
      profile.professionalBio ?? undefined,
      profile.currentOrganization ?? undefined,
      profile.state ?? undefined,
      profile.city ?? undefined,
      profile.country ?? undefined,
      profile.timezone ?? undefined,
      profile.videoIntroductionURL ?? undefined,
      profile.mobileNumber ?? undefined,
      profile.linkedinUrl ?? undefined,
      (profile.professionalExperience as any[]) ?? [],
    );
  }

  async save(profile: UserProfile): Promise<UserProfile> {
    const data = {
      userId: profile.userId,
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
      professionalExperience: profile.professionalExperience,
    };

    const result = await this.prisma.userProfile.upsert({
      where: { userId: profile.userId },
      update: data,
      create: data,
    });

    return new UserProfile(
      result.userId,
      result.updatedAt,
      result.professionalHeadline ?? undefined,
      result.professionalBio ?? undefined,
      result.currentOrganization ?? undefined,
      result.state ?? undefined,
      result.city ?? undefined,
      result.country ?? undefined,
      result.timezone ?? undefined,
      result.videoIntroductionURL ?? undefined,
      result.mobileNumber ?? undefined,
      result.linkedinUrl ?? undefined,
      (result.professionalExperience as any[]) ?? [],
    );
  }
}
