/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { environment } from './environments/environment';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const logger = new Logger('NestApplication');

  app.use(compression());
  app.use(helmet());

  const swaggerOptions = new DocumentBuilder()
    .setTitle(environment.swagger.title)
    .setDescription(environment.swagger.description)
    .setVersion(environment.swagger.version)
    .setContact(
      environment.swagger.contact.name,
      environment.swagger.contact.url,
      environment.swagger.contact.email
    )
    .addServer(`http://${environment.app.host}:{port}/api/`, 'Development', {
      port: {
        enum: [environment.app.port],
        default: environment.app.port
      }
    })
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization' })
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true
    }
  });

  app.use('/robots.txt', (_, res) => {
    res.send('User-Agent: *\n' + 'Disallow: /');
  });
  app.use('/favicon.ico', (_, res) => {
    res.sendStatus(HttpStatus.NO_CONTENT).end();
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = environment.app.port || 3333;
  await app.listen(port, () => {
    logger.log('Listening at ' + environment.app.domain + '/' + globalPrefix);
  });
}

bootstrap();
