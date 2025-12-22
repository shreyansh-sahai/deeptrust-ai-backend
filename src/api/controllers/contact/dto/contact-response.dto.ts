import { ApiProperty } from '@nestjs/swagger';

export class ContactResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the contact',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  contactId: string;

  @ApiProperty({
    description: 'Email address of the contact',
    example: 'contact@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: 'Display name',
    example: 'John Doe',
    required: false,
  })
  displayName?: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+1-555-010-999',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Organization name',
    example: 'DeepTrust AI',
    required: false,
  })
  organization?: string;

  @ApiProperty({
    description: 'Job title',
    example: 'Project Manager',
    required: false,
  })
  jobTitle?: string;

  @ApiProperty({
    description: 'Notes about the contact',
    example: 'Met at the conference',
    required: false,
  })
  notes?: string;

  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com/photos/johndoe.jpg',
    required: false,
  })
  photoUrl?: string;
}
