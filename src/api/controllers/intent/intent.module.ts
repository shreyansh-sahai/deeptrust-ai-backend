import { Module, forwardRef } from '@nestjs/common';
import { IntentController } from './intent.controller';
import { IntentService } from '@application/intent/services/intent.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { NetworkAnalyserModule } from '@api/controllers/network_analyser/networkAnalyser.module';

@Module({
  imports: [InfrastructureModule, forwardRef(() => NetworkAnalyserModule)],
  controllers: [IntentController],
  providers: [IntentService],
  exports: [IntentService],
})
export class IntentModule { }
