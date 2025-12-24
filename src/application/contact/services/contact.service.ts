import { Injectable } from '@nestjs/common';
import { ContactRepository } from '@infrastructure/repositories/contact.repository';
import { Contact } from '@domain/models/contact.model';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async getContactsByUserId(userId: string): Promise<Contact[]> {
    console.info('Fetching contacts for user: ', userId);
    return await this.contactRepository.findAllByUserId(userId);
  }
}
