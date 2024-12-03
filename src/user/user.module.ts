import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from 'src/task/task.service';
import { TimerService } from 'src/timer/timer.service';

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, TaskService, TimerService],
	exports: [UserService],
})
export class UserModule {}
