export class User {
  id: string;
  email: string;
  fullName?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  contactId?: string;
  metadata?: any;

  constructor(
    id: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
    fullName?: string,
    contactId?: string,
    metadata?: any,
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
    this.contactId = contactId;
    this.metadata = metadata;
  }
}
