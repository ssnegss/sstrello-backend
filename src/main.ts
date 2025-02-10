import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.use(cookieParser());
	app.enableCors({
		origin: [process.env.ORIGIN],
		credentials: true,
		exposedHeaders: 'set-cookie',
	});
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
		next();
	});

	await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
