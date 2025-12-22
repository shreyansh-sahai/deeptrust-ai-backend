import { IsNotEmpty, IsString, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveNetworkDto {
  @ApiProperty({
    description: 'The list of contact IDs to assign to the network',
    example: ['987e6543-e21b-12d3-a456-426614174999'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  contactIds: string[];

  @ApiProperty({
    description: 'The network type (bucket name)',
    example: 'executive-team',
  })
  @IsString()
  @IsNotEmpty()
  networkType: string;

  @ApiProperty({
    description: 'Whether it is a custom network type',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isCustom: boolean;
}
