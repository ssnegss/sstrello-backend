import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	getAll(userId: string) {
		return this.prisma.task.findMany({
			where: { userId },
		});
	}

	getCompleted(id: string) {
		return this.prisma.task.count({
			where: {
				userId: id,
				isCompleted: true,
			},
		});
	}

	getByTime(id: string, time: Date) {
		return this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: time,
				},
			},
		});
	}

	create(dto: CreateTaskDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	update(dto: UpdateTaskDto, taskId: string, userId: string) {
		return this.prisma.task.update({
			where: {
				userId,
				id: taskId,
			},
			data: dto,
		});
	}

	delete(taskId: string, userId: string) {
		return this.prisma.task.delete({
			where: {
				id: taskId,
				userId,
			},
		});
	}
}
