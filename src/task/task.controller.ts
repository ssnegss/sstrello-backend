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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('user/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	@HttpCode(200)
	@Auth()
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateTaskDto, @CurrentUser('id') userId: string) {
		return this.taskService.create(dto, userId);
	}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId);
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async update(
		@Body() dto: UpdateTaskDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.taskService.update(dto, id, userId);
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.taskService.delete(id);
	}
}
