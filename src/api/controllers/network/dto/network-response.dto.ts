import { ApiProperty } from '@nestjs/swagger';

export class NetworkResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Network saved successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
    example: {
      contactId: '987e6543-e21b-12d3-a456-426614174999',
      networkType: 'executive-team',
      buckets: ['professional', 'high-priority'],
      updatedAt: '2025-12-18T13:22:11.000Z',
    },
  })
  data: any;
}
