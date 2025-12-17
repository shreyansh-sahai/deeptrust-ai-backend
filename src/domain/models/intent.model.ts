export class Intent {
  id: string;
  userId: string;
  goalTitle: string;
  goalDescription: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    goalTitle: string,
    goalDescription: string,
    metadata: Record<string, any>,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.goalTitle = goalTitle;
    this.goalDescription = goalDescription;
    this.metadata = metadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
