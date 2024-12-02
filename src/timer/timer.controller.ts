import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CreateTimerDto } from './dto/create-timer.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';
import { TimerService } from './timer.service';

@Controller('user/timer')
export class TimerController {
	constructor(private readonly timerService: TimerService) {}

	@Post()
	@HttpCode(200)
	@Auth()
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateTimerDto, @CurrentUser('id') userId: string) {
		return this.timerService.create(dto, userId);
	}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.timerService.getAll(userId);
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async update(
		@Body() dto: UpdateTimerDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.timerService.update(dto, id, userId);
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.timerService.delete(id, userId);
	}
}
