import { Module } from '@nestjs/common';
import { NetworkController } from './network.controller';
import { NetworkService } from '@application/network/services/network.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [NetworkController],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
