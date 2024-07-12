import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.useGlobalFilters( new RpcCustomExceptionFilter() );

  app.setGlobalPrefix('api', {
    exclude: [{
      path: '',
      method: RequestMethod.GET
    }]
  });

  await app.listen( envs.port );

  console.log('Healt Check added');

  logger.log(`Client gateway running port ::: ${ envs.port }`)
}
bootstrap();
