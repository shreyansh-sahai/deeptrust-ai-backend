import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContactService } from '@application/contact/services/contact.service';
import { ContactResponseDto } from './dto/contact-response.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'contacts',
  version: '1',
})
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all contacts for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of contacts retrieved successfully',
    type: [ContactResponseDto],
  })
  async getAllContacts(
    @CurrentUser('sub') userId: string,
  ): Promise<ContactResponseDto[]> {
    const contacts = await this.contactService.getContactsByUserId(userId);

    return contacts.map((contact) => ({
      contactId: contact.id,
      email: contact.email || '',
      firstName: contact.firstName,
      lastName: contact.lastName,
      displayName: contact.displayName,
      phoneNumber: contact.phoneNumber,
      organization: contact.organization,
      jobTitle: contact.jobTitle,
      notes: contact.notes,
      photoUrl: contact.photoUrl,
    }));
  }
}
