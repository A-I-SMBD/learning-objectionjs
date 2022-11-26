import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersExternalModule } from './backend-modules/nestjs/modules/users/externals/users-external.module';

const importingConfigModules = [ConfigModule.forRoot()];

const importingCommonModules = [UsersExternalModule];

const imports = [...importingConfigModules, ...importingCommonModules];

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
