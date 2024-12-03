import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { TimerRoundDto, TimerSessionDto } from './dto/timer.dto';

@Injectable()
export class TimerService {
	constructor(
		private prisma: PrismaService,
		private UserService: UserService,
	) {}

	async getTodaySession(userId: string) {
		const today = new Date().toISOString().split('T')[0];

		return this.prisma.timerSession.findFirst({
			where: {
				createdAt: {
					gte: new Date(today),
				},
				userId,
			},
			include: {
				rounds: {
					orderBy: {
						id: 'desc',
					},
				},
			},
		});
	}

	async create(userId: string) {
		const todaySession = await this.getTodaySession(userId);

		if (todaySession) return todaySession;

		const user = await this.UserService.getWithIntervals(userId);

		if (!user) throw new NotFoundException('User is not found');

		return this.prisma.timerSession.create({
			data: {
				rounds: {
					createMany: {
						data: Array.from({ length: user.intervalsCount }, () => ({
							totalSeconds: 0,
						})),
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
			include: {
				rounds: true,
			},
		});
	}

	async updateSession(
		dto: TimerSessionDto,
		timerSessionId: string,
		userId: string,
	) {
		return this.prisma.timerSession.update({
			where: {
				userId,
				id: timerSessionId,
			},
			data: dto,
		});
	}

	async updateRound(dto: TimerRoundDto, timerRoundId: string) {
		return this.prisma.timerRound.update({
			where: {
				id: timerRoundId,
			},
			data: dto,
		});
	}

	async deleteSession(timerSessionId: string, userId: string) {
		return this.prisma.timerSession.delete({
			where: {
				id: timerSessionId,
				userId,
			},
		});
	}
}
