import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.task.findMany({
			where: { userId },
		});
	}

	async getCompleted(id: string) {
		return this.prisma.task.count({
			where: {
				userId: id,
				isCompleted: true,
			},
		});
	}

	async getByTime(id: string, time: Date) {
		return this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: time,
				},
			},
		});
	}

	async create(dto: CreateTaskDto, userId: string) {
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

	async update(dto: UpdateTaskDto, taskId: string, userId: string) {
		return this.prisma.task.update({
			where: {
				userId,
				id: taskId,
			},
			data: dto,
		});
	}

	async delete(taskId: string, userId: string) {
		return this.prisma.task.delete({
			where: {
				id: taskId,
				userId,
			},
		});
	}
}
