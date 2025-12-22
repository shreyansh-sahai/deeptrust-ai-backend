import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Updated professional headline',
    example: 'Lead Software Engineer | Cloud Architect',
    required: false,
  })
  @IsString()
  @IsOptional()
  professionalHeadline?: string;

  @ApiProperty({
    description: 'Updated professional bio',
    example: 'Expert in distributed systems and microservices architecture.',
    required: false,
  })
  @IsString()
  @IsOptional()
  professionalBio?: string;

  @ApiProperty({
    description: 'Current organization of the user',
    example: 'DeepTrust AI',
    required: false,
  })
  @IsString()
  @IsOptional()
  currentOrganization?: string;

  @ApiProperty({
    description: 'Updated state',
    example: 'New York',
    required: false,
  })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'Updated city',
    example: 'New York City',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Updated country',
    example: 'United States',
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: 'Updated timezone',
    example: 'America/New_York',
    required: false,
  })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiProperty({
    description: 'Updated video introduction URL',
    example: 'https://example.com/new-intro-video.mp4',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoIntroductionURL?: string;

  @ApiProperty({
    description: 'Updated mobile number',
    example: '+1-555-987-6543',
    required: false,
  })
  @IsString()
  @IsOptional()
  mobileNumber?: string;

  @ApiProperty({
    description: 'Updated LinkedIn profile URL',
    example: 'https://linkedin.com/in/janedoe',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;
}
