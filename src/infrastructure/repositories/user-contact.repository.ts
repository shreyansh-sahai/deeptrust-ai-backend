import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserContactRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAllByUserId(userId: string) {
    return await this.prisma.userContact.findMany({
      where: { userId },
    });
  }

  async updateNetworkBuckets(userId: string, contactIds: string[], networkType: string) {
    // 1. Add networkType to buckets for the specified contacts
    for (const contactId of contactIds) {
      const uc = await this.prisma.userContact.findUnique({
        where: {
          userId_contactId: {
            userId,
            contactId,
          },
        },
      });

      const [networkTypeName, networkTypeDescription] = networkType.split(':');
      if (!networkTypeDescription) {
        networkType = networkTypeName;
      }
      if (!uc) {
        throw new NotFoundException(`Contact ${contactId} is not associated with user ${userId}`);
      } else if (!uc.buckets.includes(networkType)) {
        await this.prisma.userContact.update({
          where: { id: uc.id },
          data: {
            buckets: {
              push: networkType,
            },
          },
        });
      }
    }

    // 2. Remove networkType from buckets for contacts NOT in the list
    // Note: Prisma updateMany with array filter for 'has' and then removal is tricky.
    // We'll fetch and update if needed, but for performance with updateMany:
    // This is better handled as: any UserContact for this user NOT in contactIds AND having networkType in buckets should have it removed.

    const contactsToUpdate = await this.prisma.userContact.findMany({
      where: {
        userId,
        contactId: { notIn: contactIds },
        buckets: { has: networkType },
      },
      select: { id: true, buckets: true },
    });

    for (const uc of contactsToUpdate) {
      await this.prisma.userContact.update({
        where: { id: uc.id },
        data: {
          buckets: {
            set: uc.buckets.filter((b) => b !== networkType),
          },
        },
      });
    }
  }

  async removeFromAllBuckets(userId: string, bucketValue: string) {
    const contacts = await this.prisma.userContact.findMany({
      where: {
        userId,
        NOT: {
          buckets: {
            equals: [],
          },
        },
      },
      select: { id: true, buckets: true },
    });

    for (const uc of contacts) {
      const filteredBuckets = uc.buckets.filter((b) => b.split(':')[0] !== bucketValue);
      if (filteredBuckets.length !== uc.buckets.length) {
        await this.prisma.userContact.update({
          where: { id: uc.id },
          data: {
            buckets: {
              set: filteredBuckets,
            },
          },
        });
      }
    }
  }
}
