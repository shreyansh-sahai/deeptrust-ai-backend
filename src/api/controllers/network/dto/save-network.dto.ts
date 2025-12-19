import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveNetworkDto {
  @ApiProperty({
    description: 'The ID of the user saving the network',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID of the contact',
    example: '987e6543-e21b-12d3-a456-426614174999',
  })
  @IsString()
  @IsNotEmpty()
  contactId: string;

  @ApiProperty({
    description: 'The network type (will be added to UserContact buckets array)',
    example: 'executive-team',
  })
  @IsString()
  @IsNotEmpty()
  networkType: string;

  @ApiProperty({
    description: 'Optional array of additional bucket names',
    example: ['professional', 'high-priority'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  buckets?: string[];
}
