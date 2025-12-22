import { IsNotEmpty, IsString, IsObject, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddIntentDto {
  @ApiProperty({
    description: 'The title of the goal',
    example: 'Increase sales by 20%',
  })
  @IsString()
  @IsNotEmpty()
  goalTitle: string;

  @ApiProperty({
    description: 'Detailed description of the goal',
    example: 'Focus on expanding customer base in the northeast region',
  })
  @IsString()
  @IsNotEmpty()
  goalDescription: string;

  @ApiProperty({
    description: 'Additional metadata for the intent',
    example: { priority: 'high', category: 'sales' },
  })
  @IsObject()
  @IsNotEmpty()
  metadata: Record<string, any>;

  @ApiProperty({
    description: 'Optional voice file link',
    example: 'https://example.com/voice/recording.mp3',
    required: false,
    nullable: true,
  })
  @IsUrl()
  @IsOptional()
  voiceFileLink?: string | null;
}
