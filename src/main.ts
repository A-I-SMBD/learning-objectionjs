import { NestFactory } from '@nestjs/core';
import connector from 'knex';
import { Knex } from 'knex';
import { Model } from 'objection';
import { AppModule } from './app.module';
import knexConfigs from './core/knex/knex.configs';
import { up } from './core/knex/migrations/11-27-2022-initial-schemas.migration';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './core/swagger/swagger.config';
import { INestApplication } from '@nestjs/common';

type Port = string | number;

const PORT: Port = process.env.PORT || 3000;

function connectionToDatabase(): void {
  // Initialize knex.
  const knex = connector(knexConfigs.development);

  Model.knex(knex);

  createSchema(knex).catch(err => {
    console.error(err);
    return knex.destroy();
  });
}

async function createSchema(knex: Knex<any, unknown[]>) {
  await up(knex);
}

function createSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  connectionToDatabase();

  const app = await NestFactory.create(AppModule);

  createSwagger(app);

  await app.listen(PORT).catch(error => console.error(error));
}
bootstrap();
