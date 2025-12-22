import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { IntegrationRepository } from './repositories/integration.repository';
import { IntegrationAccountRepository } from './repositories/integration-account.repository';
import { ContactRepository } from './repositories/contact.repository';
import { IntentRepository } from './repositories/intent.repository';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserContactRepository } from './repositories/user-contact.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    UserRepository,
    IntegrationRepository,
    IntegrationAccountRepository,
    ContactRepository,
    IntentRepository,
    UserProfileRepository,
    UserContactRepository,
  ],
  exports: [
    PrismaModule,
    UserRepository,
    IntegrationRepository,
    IntegrationAccountRepository,
    ContactRepository,
    IntentRepository,
    UserProfileRepository,
    UserContactRepository,
  ],
})
export class InfrastructureModule { }
