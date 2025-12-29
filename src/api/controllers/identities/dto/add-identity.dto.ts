import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddIdentityDto {
    @ApiProperty({
        description: 'The identity type',
        example: 'persona',
    })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        description: 'The goal title',
        example: 'Tech Startup Founder',
    })
    @IsString()
    @IsNotEmpty()
    goalTitle: string;

    @ApiProperty({
        description: 'The goal description',
        example: 'Aspiring entrepreneur focused on building a scalable SaaS product in the AI productivity space.',
    })
    @IsString()
    @IsOptional()
    goalDescription?: string;

    @ApiProperty({
        description: 'Whether this identity is active',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    activeIdentity?: boolean;

    @ApiProperty({
        description: 'Demographics information',
        example: {
            industry: 'Technology',
            decisionMakerTitles: ['CEO', 'Founder'],
            location: {
                city: 'San Francisco',
                state: 'CA',
                country: 'United States',
            },
        },
    })
    @IsObject()
    @IsOptional()
    demographics: {
        industry: string;
        decisionMakerTitles: string[];
        location: {
            country: string;
            state: string;
            city: string;
        };
    }
}