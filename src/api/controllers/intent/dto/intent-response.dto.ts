import { ApiProperty } from '@nestjs/swagger';

export class IntentResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the intent',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the user who owns this intent',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @ApiProperty({
    description: 'The title of the goal',
    example: 'Increase sales by 20%',
  })
  goalTitle: string;

  @ApiProperty({
    description: 'Detailed description of the goal',
    example: 'Focus on expanding customer base in the northeast region',
  })
  goalDescription: string;

  @ApiProperty({
    description: 'Additional metadata for the intent',
    example: { priority: 'high', category: 'sales' },
  })
  metadata: Record<string, any>;

  @ApiProperty({
    description: 'When the intent was created',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'When the intent was last updated',
    example: '2024-01-16T14:20:00Z',
  })
  updatedAt: Date;
}
