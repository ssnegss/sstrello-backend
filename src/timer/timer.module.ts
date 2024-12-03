import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';
import { UserService } from 'src/user/user.service';
import { TaskService } from 'src/task/task.service';

@Module({
	controllers: [TimerController],
	providers: [TimerService, PrismaService, UserService, TaskService],
})
export class TimerModule {}
