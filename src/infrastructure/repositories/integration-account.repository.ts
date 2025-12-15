import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IntegrationAccount } from '../../domain/models/integration-account.model';
import { CreateIntegrationAccountDto } from '../dtos/create-integration-account.dto';
import { UpdateIntegrationAccountDto } from '../dtos/update-integration-account.dto';

@Injectable()
export class IntegrationAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndIntegration(
    userId: string,
    integrationId: string,
  ): Promise<IntegrationAccount | null> {
    const account = await this.prisma.integrationAccount.findFirst({
      where: {
        userId,
        integrationId,
      },
    });

    if (!account) return null;

    return new IntegrationAccount(
      account.id,
      account.userId,
      account.integrationId,
      account.remoteProviderId,
      account.accessTokenEnc,
      account.refreshTokenEnc,
      account.tokenExpiresAt,
      account.scopesGranted,
      account.status,
      account.createdAt,
      account.updatedAt,
      account.remoteEmail ?? undefined,
      account.lastErrorMessage ?? undefined,
      account.disconnectReason ?? undefined,
    );
  }

  async create(
    data: CreateIntegrationAccountDto,
  ): Promise<IntegrationAccount> {
    const account = await this.prisma.integrationAccount.create({
      data: {
        userId: data.userId,
        integrationId: data.integrationId,
        remoteProviderId: data.remoteProviderId,
        remoteEmail: data.remoteEmail,
        accessTokenEnc: data.accessTokenEnc,
        refreshTokenEnc: data.refreshTokenEnc,
        tokenExpiresAt: data.tokenExpiresAt,
        scopesGranted: data.scopesGranted,
        status: 'active',
      },
    });

    return new IntegrationAccount(
      account.id,
      account.userId,
      account.integrationId,
      account.remoteProviderId,
      account.accessTokenEnc,
      account.refreshTokenEnc,
      account.tokenExpiresAt,
      account.scopesGranted,
      account.status,
      account.createdAt,
      account.updatedAt,
      account.remoteEmail ?? undefined,
      account.lastErrorMessage ?? undefined,
      account.disconnectReason ?? undefined,
    );
  }

  async update(
    id: string,
    data: UpdateIntegrationAccountDto,
  ): Promise<IntegrationAccount> {
    const account = await this.prisma.integrationAccount.update({
      where: { id },
      data,
    });

    return new IntegrationAccount(
      account.id,
      account.userId,
      account.integrationId,
      account.remoteProviderId,
      account.accessTokenEnc,
      account.refreshTokenEnc,
      account.tokenExpiresAt,
      account.scopesGranted,
      account.status,
      account.createdAt,
      account.updatedAt,
      account.remoteEmail ?? undefined,
      account.lastErrorMessage ?? undefined,
      account.disconnectReason ?? undefined,
    );
  }
}
