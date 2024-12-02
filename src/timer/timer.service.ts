import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimerDto } from './dto/create-timer.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';

@Injectable()
export class TimerService {
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

	create(dto: CreateTimerDto, userId: string) {
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

	update(dto: UpdateTimerDto, taskId: string, userId: string) {
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
