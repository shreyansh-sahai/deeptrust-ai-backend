export class Intent {
  id: string;
  userId: string;
  goalTitle: string;
  goalDescription: string;
  metadata: Record<string, any>;
  voiceFileLink?: string | null;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;

  constructor(
    id: string,
    userId: string,
    goalTitle: string,
    goalDescription: string,
    metadata: Record<string, any>,
    createdAt: Date,
    updatedAt?: Date,
    voiceFileLink?: string | null,
    isDeleted: boolean = false,
  ) {
    this.id = id;
    this.userId = userId;
    this.goalTitle = goalTitle;
    this.goalDescription = goalDescription;
    this.metadata = metadata;
    this.voiceFileLink = voiceFileLink;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }
}
