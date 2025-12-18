export class Contact {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  organization?: string;
  jobTitle?: string;
  notes?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
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
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.organization = organization;
    this.jobTitle = jobTitle;
    this.notes = notes;
    this.photoUrl = photoUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
