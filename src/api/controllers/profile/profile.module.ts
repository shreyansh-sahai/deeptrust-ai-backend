import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from '@application/profile/services/profile.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
