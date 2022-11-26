import { NestFactory } from '@nestjs/core';
import connector from 'knex';
import { Knex } from 'knex';
import { Model } from 'objection';
import { AppModule } from './app.module';
import knexConfigs from './core/knex/knex.configs';
import { up } from './core/knex/migrations/11-27-2022-initial-schemas.migration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function connectionToDatabase(): void {
  // Initialize knex.
  const knex = connector(knexConfigs.development);

  // Bind all Models to a knex instance. If you only have one database in
  // your server this is all you have to do. For multi database systems, see
  // the Model.bindKnex() method.
  Model.knex(knex);

  createSchema(knex).catch(err => {
    console.error(err);
    return knex.destroy();
  });
}

async function createSchema(knex: Knex<any, unknown[]>) {
  await up(knex);
}

async function bootstrap() {
  connectionToDatabase();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
