import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { IntegrationRepository } from './repositories/integration.repository';
import { IntegrationAccountRepository } from './repositories/integration-account.repository';
import { ContactRepository } from './repositories/contact.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, IntegrationRepository, IntegrationAccountRepository, ContactRepository],
  exports: [UserRepository, IntegrationRepository, IntegrationAccountRepository, ContactRepository],
})
export class InfrastructureModule { }
