import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User } from '../../domain/models/user.model';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.createdAt,
      user.updatedAt,
      user.isActive,
      user.fullName ?? undefined,
    );
  }

  async create(email: string, fullName?: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        fullName,
        metadata: {
          isOnboarded: false,
          onboardingStep: 0
        },
      },
    });

    return new User(
      user.id,
      user.email,
      user.createdAt,
      user.updatedAt,
      user.isActive,
      user.fullName ?? undefined,
    );
  }

  async update(
    id: string,
    data: { fullName?: string; isActive?: boolean, contactId?: string, metadata?: any },
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return new User(
      user.id,
      user.email,
      user.createdAt,
      user.updatedAt,
      user.isActive,
      user.fullName ?? undefined,
      user.contactId ?? undefined,
      user.metadata ?? undefined,
    );
  }
}
