import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserIdentity } from '@domain/models/user-identity.model';

@Injectable()
export class UserIdentityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, identity: Record<string, any>): Promise<UserIdentity> {
    const rec = await this.prisma.userIdentity.create({
      data: {
        userId,
        identity,
      },
    });

    return new UserIdentity(
      rec.id,
      rec.userId,
      rec.identity as Record<string, any>,
      rec.created_at,
      rec.updated_at ?? undefined,
      rec.isDeleted,
    );
  }

  async findByUserId(userId: string): Promise<UserIdentity[]> {
    const rows = await this.prisma.userIdentity.findMany({
      where: { userId, isDeleted: false },
      orderBy: { created_at: 'desc' },
    });

    return rows.map(
      (rec) =>
        new UserIdentity(
          rec.id,
          rec.userId,
          rec.identity as Record<string, any>,
          rec.created_at,
          rec.updated_at ?? undefined,
          rec.isDeleted,
        ),
    );
  }

  async findById(id: string): Promise<UserIdentity | null> {
    const rec = await this.prisma.userIdentity.findFirst({ where: { id, isDeleted: false } });
    if (!rec) return null;
    return new UserIdentity(
      rec.id,
      rec.userId,
      rec.identity as Record<string, any>,
      rec.created_at,
      rec.updated_at ?? undefined,
      rec.isDeleted,
    );
  }

  async update(userId: string, id: string, identity: Record<string, any>): Promise<UserIdentity> {
    const res = await this.prisma.userIdentity.updateMany({
      where: { id, userId, isDeleted: false },
      data: {
        identity,
        updated_at: new Date(),
      },
    });

    if (res.count === 0) {
      throw new Error('Identity not found or access denied');
    }

    const rec = await this.prisma.userIdentity.findFirst({ where: { id } });
    
    if (!rec) {
      throw new Error('Identity not found after update');
    }

    return new UserIdentity(
      rec.id,
      rec.userId,
      rec.identity as Record<string, any>,
      rec.created_at,
      rec.updated_at ?? undefined,
      rec.isDeleted,
    );
  }

  async softDelete(userId: string, id: string): Promise<void> {
    const res = await this.prisma.userIdentity.updateMany({
      where: { id, userId, isDeleted: false },
      data: { isDeleted: true, updated_at: new Date() },
    });

    if (res.count === 0) {
      throw new Error('Identity not found or access denied');
    }
  }
}