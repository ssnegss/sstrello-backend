import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class TimerSessionDto {
	@IsOptional()
	@IsBoolean()
	isCompleted: boolean;
}

export class TimerRoundDto {
	@IsNumber()
	totalSeconds: number;

	@IsOptional()
	@IsBoolean()
	isCompleted: boolean;
}
