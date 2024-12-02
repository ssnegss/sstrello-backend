import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

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

	create(createTaskDto: CreateTaskDto) {
		return 'This action adds a new task';
	}

	findAll() {
		return `This action returns all task`;
	}

	findOne(id: number) {
		return `This action returns a #${id} task`;
	}

	update(id: number, updateTaskDto: UpdateTaskDto) {
		return `This action updates a #${id} task`;
	}

	remove(id: number) {
		return `This action removes a #${id} task`;
	}
}
