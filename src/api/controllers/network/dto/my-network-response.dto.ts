import { ApiProperty } from '@nestjs/swagger';

export class MyNetworkResponseDto {
  @ApiProperty({
    description: 'The name of the network (bucket)',
    example: 'executive-team',
  })
  networkType: string;

  @ApiProperty({
    description: 'The display name of the network',
    example: 'Executive Team',
  })
  networkTypeName: string;

  @ApiProperty({
    description: 'List of contact IDs assigned to this network',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  contactIds: string[];
}
