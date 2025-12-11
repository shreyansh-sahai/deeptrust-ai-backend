import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from '../database/prisma.module';
import { PrismaHealthIndicator } from './prisma-health.indicator';

@Module({
  imports: [TerminusModule, PrismaModule],
  providers: [PrismaHealthIndicator],
  exports: [TerminusModule, PrismaHealthIndicator],
})
export class HealthModule {}
