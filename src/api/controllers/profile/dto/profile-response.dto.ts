import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @ApiProperty({
    description: 'Professional headline',
    example: 'Senior Software Engineer | Full Stack Developer',
    required: false,
  })
  professionalHeadline?: string;

  @ApiProperty({
    description: 'Professional bio',
    example: 'Passionate about building scalable applications.',
    required: false,
  })
  professionalBio?: string;

  @ApiProperty({
    description: 'State',
    example: 'California',
    required: false,
  })
  state?: string;

  @ApiProperty({
    description: 'City',
    example: 'San Francisco',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'Country',
    example: 'United States',
    required: false,
  })
  country?: string;

  @ApiProperty({
    description: 'Timezone',
    example: 'America/Los_Angeles',
    required: false,
  })
  timezone?: string;

  @ApiProperty({
    description: 'Video introduction URL',
    example: 'https://example.com/intro-video.mp4',
    required: false,
  })
  videoIntroductionURL?: string;

  @ApiProperty({
    description: 'Mobile number',
    example: '+1-555-123-4567',
    required: false,
  })
  mobileNumber?: string;

  @ApiProperty({
    description: 'LinkedIn URL',
    example: 'https://linkedin.com/in/johndoe',
    required: false,
  })
  linkedinUrl?: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-12-17T12:00:00.000Z',
  })
  updatedAt: Date;
}
