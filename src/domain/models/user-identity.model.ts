export class UserIdentity {
  id: string;
  userId: string;
  identity: Record<string, any>;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;

  constructor(
    id: string,
    userId: string,
    identity: Record<string, any>,
    createdAt: Date,
    updatedAt?: Date,
    isDeleted: boolean = false,
  ) {
    this.id = id;
    this.userId = userId;
    this.identity = identity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }
}