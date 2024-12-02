import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('time-block')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Post()
	@HttpCode(200)
	@Auth()
	@UsePipes(new ValidationPipe())
	async create(
		@Body() dto: CreateTimeBlockDto,
		@CurrentUser('id') userId: string,
	) {
		return this.timeBlockService.create(dto, userId);
	}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.timeBlockService.getAll(userId);
	}

	@Put('update-order')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(updateOrderDto.ids);
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async update(
		@Body() dto: UpdateTimeBlockDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.timeBlockService.update(dto, id, userId);
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.timeBlockService.delete(id, userId);
	}
}
