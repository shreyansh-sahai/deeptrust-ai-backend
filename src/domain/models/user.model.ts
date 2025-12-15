export class User {
  id: string;
  email: string;
  fullName?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;

  constructor(
    id: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
    fullName?: string,
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
  }
}
