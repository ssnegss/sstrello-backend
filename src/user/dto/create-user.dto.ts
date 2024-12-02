import { IsEmail, IsString, MinLength } from 'class-validator';
import { PomodoroSettingsDto } from './pomodoro-settings.dto';

export class CreateUserDto extends PomodoroSettingsDto {
	@IsEmail()
	email: string;

	@IsString()
	name: string;

	@IsString()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	password: string;
}
