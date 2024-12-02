import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from 'src/task/task.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private TaskService: TaskService,
	) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				tasks: true,
			},
		});
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async getProfile(id: string) {
		const profile = await this.getById(id);

		const totalTasks = profile.tasks.length;
		const completedTasks = this.TaskService.getCompleted(id);

		const todayStart = startOfDay(new Date());
		const weekStart = startOfDay(subDays(new Date(), 7));

		const todayTasks = this.TaskService.getByTime(id, todayStart);
		const weekTasks = this.TaskService.getByTime(id, weekStart);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = profile;

		return {
			user: user,
			statistics: [
				{ label: 'Total', value: totalTasks },
				{ label: 'Completed tasks', value: completedTasks },
				{ label: 'Today tasks', value: todayTasks },
				{ label: 'Week tasks', value: weekTasks },
			],
		};
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password),
		};

		return this.prisma.user.create({
			data: user,
		});
	}

	async update(id: string, dto: UpdateUserDto) {
		let data = dto;

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) };
		}

		return this.prisma.user.update({
			where: {
				id,
			},
			data,
			select: {
				name: true,
				email: true,
			},
		});
	}
}
