import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTimeBlockDto {
	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	color?: string;

	@IsNumber()
	@IsOptional()
	duration?: number;

	@IsNumber()
	@IsOptional()
	order?: number;
}
