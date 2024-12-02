import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';

@Injectable()
export class TimeBlockService {
	constructor(private prisma: PrismaService) {}

	getAll(userId: string) {
		return this.prisma.timeBlock.findMany({
			where: { userId },
			orderBy: {
				order: 'asc',
			},
		});
	}

	create(dto: CreateTimeBlockDto, userId: string) {
		return this.prisma.timeBlock.create({
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

	update(dto: UpdateTimeBlockDto, timeBlockId: string, userId: string) {
		return this.prisma.timeBlock.update({
			where: {
				userId,
				id: timeBlockId,
			},
			data: dto,
		});
	}

	delete(timeBlockId: string, userId: string) {
		return this.prisma.timeBlock.delete({
			where: {
				id: timeBlockId,
				userId,
			},
		});
	}

	async updateOrder(ids: string[]) {
		return this.prisma.$transaction(
			ids.map((id, order) =>
				this.prisma.timeBlock.update({
					where: { id },
					data: { order },
				}),
			),
		);
	}
}
