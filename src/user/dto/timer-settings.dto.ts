import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class TimerSettingsDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	workInterval?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	breakInterval?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(10)
	intervalsCount?: number;
}
