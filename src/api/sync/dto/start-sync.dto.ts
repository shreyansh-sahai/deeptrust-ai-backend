import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export enum ResourceType {
  CONTACTS = 'contacts',
  CALENDAR = 'calendar',
  EMAIL = 'email',
}

export class StartSyncDto {
  @IsUUID()
  @IsNotEmpty()
  integrationAccountId: string;

  @IsEnum(ResourceType)
  @IsNotEmpty()
  resourceType: ResourceType;
}

