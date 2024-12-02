import { IsString } from 'class-validator';

export class CreateTaskDto {
	@IsString()
	name: string;

	@IsString()
	createdAt: string;
}
