import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Integration } from '../../domain/models/integration.model';

@Injectable()
export class IntegrationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProvider(provider: string): Promise<Integration | null> {
    const integration = await this.prisma.integration.findFirst({
      where: { provider },
    });

    if (!integration) return null;

    return new Integration(
      integration.id,
      integration.slug,
      integration.name,
      integration.provider,
      integration.isGlobalEnabled,
      integration.requiredScopes,
      integration.createdAt,
      integration.authBaseUrl ?? undefined,
      integration.tokenUrl ?? undefined,
    );
  }
}
