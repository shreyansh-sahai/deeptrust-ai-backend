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
}