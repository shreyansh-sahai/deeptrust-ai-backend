import { IsNotEmpty, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddIntentDto {
  @ApiProperty({
    description: 'The ID of the user creating the intent',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

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
}
