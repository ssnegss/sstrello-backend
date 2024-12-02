import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user/profile')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Auth()
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id);
	}

	@Put()
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async updateProfile(
		@CurrentUser('id') id: string,
		@Body() dto: UpdateUserDto,
	) {
		return this.userService.update(id, dto);
	}
}
