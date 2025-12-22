import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    constructor(firstName?: string, lastName?: string, email?: string, fullName?: string, photoUrl?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.fullName = fullName;
        this.photoUrl = photoUrl;
    }

    @ApiProperty({
        description: 'First Name',
        example: 'John',
    })
    firstName?: string;

    @ApiProperty({
        description: 'Last Name',
        example: 'Doe',
    })
    lastName?: string;

    @ApiProperty({
        description: 'Email',
        example: 'john.doe@example.com',
    })
    email?: string;

    @ApiProperty({
        description: 'Full Name',
        example: 'John Doe',
    })
    fullName?: string;

    @ApiProperty({
        description: 'Photo URL',
        example: 'https://example.com/photo.jpg',
    })
    photoUrl?: string;
}
