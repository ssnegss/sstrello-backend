import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from 'src/task/task.service';

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, TaskService],
	exports: [UserService],
})
export class UserModule {}
