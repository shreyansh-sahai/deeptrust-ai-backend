export class Contact {
  id: string;
  integrationAccountId: string;
  googleResourceName?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  organization?: string;
  jobTitle?: string;
  notes?: string;
  photoUrl?: string;
  isDeleted: boolean;
  syncedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    integrationAccountId: string,
    isDeleted: boolean,
    syncedAt: Date,
    createdAt: Date,
    updatedAt: Date,
    googleResourceName?: string,
    firstName?: string,
    lastName?: string,
    displayName?: string,
    email?: string,
    phoneNumber?: string,
    organization?: string,
    jobTitle?: string,
    notes?: string,
    photoUrl?: string,
  ) {
    this.id = id;
    this.integrationAccountId = integrationAccountId;
    this.googleResourceName = googleResourceName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.organization = organization;
    this.jobTitle = jobTitle;
    this.notes = notes;
    this.photoUrl = photoUrl;
    this.isDeleted = isDeleted;
    this.syncedAt = syncedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
