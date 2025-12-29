import { ApiProperty } from '@nestjs/swagger';

export class IdentityResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the identity',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    id: string;

    @ApiProperty({
        description: 'The identity details object',
        example: {
            goalTitle: 'Tech Startup Founder',
            goalDescription: 'Aspiring entrepreneur focused on building a scalable SaaS product in the AI productivity space.',
            activeIdentity: true,
            demographics: {
                industry: 'Technology',
                decisionMakerTitles: ['CEO', 'Founder'],
                location: {
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'United States',
                },
            },
            type: 'Prospect',
        },
    })
    identity: Record<string, any>;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2023-10-27T10:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2023-10-27T10:00:00Z',
        required: false,
    })
    updatedAt?: Date;
}
