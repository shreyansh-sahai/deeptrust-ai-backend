export class UserProfile {
  userId: string;
  professionalHeadline?: string;
  professionalBio?: string;
  currentOrganization?: string;
  state?: string;
  city?: string;
  country?: string;
  timezone?: string;
  videoIntroductionURL?: string;
  mobileNumber?: string;
  linkedinUrl?: string;
  professionalExperience?: any[];
  updatedAt: Date;

  constructor(
    userId: string,
    updatedAt: Date,
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
    professionalExperience?: any[],
  ) {
    this.userId = userId;
    this.professionalHeadline = professionalHeadline;
    this.professionalBio = professionalBio;
    this.currentOrganization = currentOrganization;
    this.state = state;
    this.city = city;
    this.country = country;
    this.timezone = timezone;
    this.videoIntroductionURL = videoIntroductionURL;
    this.mobileNumber = mobileNumber;
    this.linkedinUrl = linkedinUrl;
    this.professionalExperience = professionalExperience;
    this.updatedAt = updatedAt;
  }
}
