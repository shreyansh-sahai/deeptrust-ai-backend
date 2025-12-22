import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from '@application/contact/services/contact.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
