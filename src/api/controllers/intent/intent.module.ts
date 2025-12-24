import { Module } from '@nestjs/common';
import { IntentController } from './intent.controller';
import { IntentService } from '@application/intent/services/intent.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [IntentController],
  providers: [IntentService],
  exports: [IntentService],
})
export class IntentModule { }
