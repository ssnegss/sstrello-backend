import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { PomodoroSettingsDto } from './pomodoro-settings.dto';

export class UpdateUserDto extends PomodoroSettingsDto {
	@IsEmail()
	@IsOptional()
	email: string;

	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	password: string;
}
