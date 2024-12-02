import { IsEmail, IsString, MinLength } from 'class-validator';
import { TimerSettingsDto } from './timer-settings.dto';

export class CreateUserDto extends TimerSettingsDto {
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
