import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { IdentityService } from '@application/services/identity.service';
import { IdentitiesController } from './identities.controller';
import { NetworkAnalyserModule } from '../network_analyser/networkAnalyser.module';

@Module({
  imports: [InfrastructureModule, NetworkAnalyserModule],
  controllers: [IdentitiesController],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentitiesModule { }