export class UserProfile {
  userId: string;
  professionalHeadline?: string;
  professionalBio?: string;
  state?: string;
  city?: string;
  country?: string;
  timezone?: string;
  videoIntroductionURL?: string;
  mobileNumber?: string;
  linkedinUrl?: string;
  updatedAt: Date;

  constructor(
    userId: string,
    updatedAt: Date,
    professionalHeadline?: string,
    professionalBio?: string,
    state?: string,
    city?: string,
    country?: string,
    timezone?: string,
    videoIntroductionURL?: string,
    mobileNumber?: string,
    linkedinUrl?: string,
  ) {
    this.userId = userId;
    this.professionalHeadline = professionalHeadline;
    this.professionalBio = professionalBio;
    this.state = state;
    this.city = city;
    this.country = country;
    this.timezone = timezone;
    this.videoIntroductionURL = videoIntroductionURL;
    this.mobileNumber = mobileNumber;
    this.linkedinUrl = linkedinUrl;
    this.updatedAt = updatedAt;
  }
}
