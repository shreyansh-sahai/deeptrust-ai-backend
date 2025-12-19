import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProfileDto {
  @ApiProperty({
    description: 'Professional headline for the user',
    example: 'Senior Software Engineer | Full Stack Developer',
    required: false,
  })
  @IsString()
  @IsOptional()
  professionalHeadline?: string;

  @ApiProperty({
    description: 'Professional bio/summary of the user',
    example: 'Passionate about building scalable applications with modern technologies.',
    required: false,
  })
  @IsString()
  @IsOptional()
  professionalBio?: string;

  @ApiProperty({
    description: 'State where the user is located',
    example: 'California',
    required: false,
  })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'City where the user is located',
    example: 'San Francisco',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Country where the user is located',
    example: 'United States',
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: 'Timezone of the user',
    example: 'America/Los_Angeles',
    required: false,
  })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiProperty({
    description: 'URL to video introduction',
    example: 'https://example.com/intro-video.mp4',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoIntroductionURL?: string;

  @ApiProperty({
    description: 'Mobile phone number',
    example: '+1-555-123-4567',
    required: false,
  })
  @IsString()
  @IsOptional()
  mobileNumber?: string;

  @ApiProperty({
    description: 'LinkedIn profile URL',
    example: 'https://linkedin.com/in/johndoe',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;
}
