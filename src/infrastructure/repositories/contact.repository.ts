import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateContactDto } from '../dtos/create-contact-dto';
import { Contact } from '../../domain/models/contact.model';

@Injectable()
export class ContactRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateContactDto): Promise<Contact> {
        const contact = await this.prisma.contact.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                displayName: data.displayName,
                phoneNumber: data.phoneNumber,
                organization: data.organization,
                jobTitle: data.jobTitle,
                notes: data.notes,
                photoUrl: data.photoUrl
            }
        });

        return new Contact(
            contact.id,
            contact.createdAt,
            contact.updatedAt,
            contact.firstName || undefined,
            contact.lastName || undefined,
            contact.displayName || undefined,
            contact.email || undefined,
            contact.phoneNumber || undefined,
            contact.organization || undefined,
            contact.jobTitle || undefined,
            contact.notes || undefined,
            contact.photoUrl || undefined,
        );
    }

    async findByEmail(email: string): Promise<Contact | null> {
        const contact = await this.prisma.contact.findUnique({ where: { email } });
        return contact ? new Contact(
            contact.id,
            contact.createdAt,
            contact.updatedAt,
            contact.firstName || undefined,
            contact.lastName || undefined,
            contact.displayName || undefined,
            contact.email || undefined,
            contact.phoneNumber || undefined,
            contact.organization || undefined,
            contact.jobTitle || undefined,
            contact.notes || undefined,
            contact.photoUrl || undefined,
        ) : null;
    }

    async findById(id: string): Promise<Contact | null> {
        const contact = await this.prisma.contact.findUnique({ where: { id } });
        return contact ? new Contact(
            contact.id,
            contact.createdAt,
            contact.updatedAt,
            contact.firstName || undefined,
            contact.lastName || undefined,
            contact.displayName || undefined,
            contact.email || undefined,
            contact.phoneNumber || undefined,
            contact.organization || undefined,
            contact.jobTitle || undefined,
            contact.notes || undefined,
            contact.photoUrl || undefined,
        ) : null;
    }

    async findAllByUserId(userId: string): Promise<Contact[]> {
        const userContacts = await this.prisma.userContact.findMany({
            where: { userId },
            include: { contact: true }
        });

        return userContacts.map(uc => new Contact(
            uc.contact.id,
            uc.contact.createdAt,
            uc.contact.updatedAt,
            uc.contact.firstName || undefined,
            uc.contact.lastName || undefined,
            uc.contact.displayName || undefined,
            uc.contact.email || undefined,
            uc.contact.phoneNumber || undefined,
            uc.contact.organization || undefined,
            uc.contact.jobTitle || undefined,
            uc.contact.notes || undefined,
            uc.contact.photoUrl || undefined,
        ));
    }
}