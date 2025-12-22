import { IsOptional, IsString, IsObject, IsUUID, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIntentDto {
  @ApiProperty({
    description: 'The ID of the intent to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  intentId: string;

  @ApiProperty({
    description: 'The updated title of the goal',
    example: 'Increase sales by 25%',
    required: false,
  })
  @IsString()
  @IsOptional()
  goalTitle?: string;

  @ApiProperty({
    description: 'Updated description of the goal',
    example: 'Expand to both northeast and midwest regions',
    required: false,
  })
  @IsString()
  @IsOptional()
  goalDescription?: string;

  @ApiProperty({
    description: 'Updated metadata for the intent',
    example: { priority: 'medium', category: 'sales' },
    required: false,
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Updated voice file link',
    example: 'https://example.com/voice/new-recording.mp3',
    required: false,
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  voiceFileLink?: string | null;
}
