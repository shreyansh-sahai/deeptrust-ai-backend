import { Injectable, NotFoundException } from '@nestjs/common';
import { UserIdentityRepository } from '@infrastructure/repositories/user-identity.repository';
import { UserIdentity } from '@domain/models/user-identity.model';

@Injectable()
export class IdentityService {
  constructor(private readonly repo: UserIdentityRepository) {}

  async addIdentity(userId: string, identity: Record<string, any>): Promise<UserIdentity> {
    return this.repo.create(userId, identity);
  }

  async updateIdentity(userId: string, identityId: string, identityUpdates: Record<string, any>): Promise<UserIdentity> {
    const existing = await this.repo.findById(identityId);
    if (!existing || existing.userId !== userId) {
      throw new NotFoundException('Identity not found');
    }

    const updatedIdentity = {
      ...existing.identity,
      ...identityUpdates,
    };

    try {
      return await this.repo.update(userId, identityId, updatedIdentity);
    } catch (e) {
      throw new NotFoundException('Identity not found or access denied');
    }
  }

  async deleteIdentity(userId: string, identityId: string): Promise<void> {
    const existing = await this.repo.findById(identityId);
    if (!existing || existing.userId !== userId) {
      throw new NotFoundException('Identity not found');
    }
    try {
      await this.repo.softDelete(userId, identityId);
    } catch (e) {
      throw new NotFoundException('Identity not found or access denied');
    }
  }

  async myIdentities(userId: string): Promise<UserIdentity[]> {
    return this.repo.findByUserId(userId);
  }
}