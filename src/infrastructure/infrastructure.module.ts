import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { IntegrationRepository } from './repositories/integration.repository';
import { IntegrationAccountRepository } from './repositories/integration-account.repository';
import { ContactRepository } from './repositories/contact.repository';
import { IntentRepository } from './repositories/intent.repository';
import { UserProfileRepository } from './repositories/user-profile.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    UserRepository,
    IntegrationRepository,
    IntegrationAccountRepository,
    ContactRepository,
    IntentRepository,
    UserProfileRepository,
  ],
  exports: [
    PrismaModule,
    UserRepository,
    IntegrationRepository,
    IntegrationAccountRepository,
    ContactRepository,
    IntentRepository,
    UserProfileRepository,
  ],
})
export class InfrastructureModule { }
