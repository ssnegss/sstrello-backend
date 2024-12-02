import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';

@Module({
	controllers: [TimerController],
	providers: [TimerService, PrismaService],
})
export class TaskModule {}
