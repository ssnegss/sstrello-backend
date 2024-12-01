import { UserService } from './../user/user.service';
import {
	BadRequestException,
	HttpException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private UserService: UserService,
	) {}

	async login(dto: AuthDto) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.validateUser(dto);
		const tokens = this.issueTokens(user.id);

		return {
			user,
			...tokens,
		};
	}

	async register(dto: AuthDto) {
		const isRegistered = await this.UserService.getByEmail(dto.email);
		if (isRegistered)
			throw new BadRequestException('User with the email already exists');

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.UserService.create(dto);
		const tokens = this.issueTokens(user.id);

		return {
			user,
			...tokens,
		};
	}

	private issueTokens(userId: string) {
		const data = { id: userId };

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h',
		});

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d',
		});

		return { accessToken, refreshToken };
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.UserService.getByEmail(dto.email);
		if (!user) throw new NotFoundException('User is not found');

		const isValid = await verify(user.password, dto.password);
		if (!isValid) throw new NotFoundException('Password is invalid');

		return user;
	}
}
