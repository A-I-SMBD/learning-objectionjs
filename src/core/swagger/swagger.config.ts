import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

export default swaggerConfig;
