import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimeBlockDto {
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	color?: string;

	@IsNumber()
	duration: number;

	@IsNumber()
	order: number;
}
