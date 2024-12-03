import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';

import { TimerService } from './timer.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { TimerRoundDto, TimerSessionDto } from './dto/timer.dto';

@Controller('user/timer')
export class TimerController {
	constructor(private readonly timerService: TimerService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.timerService.getTodaySession(userId);
	}

	@Post()
	@HttpCode(200)
	@Auth()
	async create(@CurrentUser('id') userId: string) {
		return this.timerService.create(userId);
	}

	@Put('/round/:id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async updateRound(@Param('id') id: string, @Body() dto: TimerRoundDto) {
		return this.timerService.updateRound(dto, id);
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async updateSession(
		@Body() dto: TimerSessionDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.timerService.updateSession(dto, id, userId);
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.timerService.deleteSession(id, userId);
	}
}
