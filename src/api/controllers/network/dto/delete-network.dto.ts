import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNetworkDto {
  @ApiProperty({
    description: 'The network type (slug)',
    example: 'executive-team',
  })
  @IsString()
  @IsNotEmpty()
  networkType: string;

  @ApiProperty({
    description: 'The network type name',
    example: 'Executive Team',
  })
  @IsString()
  @IsNotEmpty()
  networkTypeName: string;
}
