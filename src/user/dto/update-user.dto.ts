import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { TimerSettingsDto } from './timer-settings.dto';

export class UpdateUserDto extends TimerSettingsDto {
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
