import { Module } from '@nestjs/common';
import { UsersPersistanceModule } from '../persistances/users-persistance.module';
import { UsersExternalController } from './users-external.controller';

const imports = [UsersPersistanceModule];

const controllers = [UsersExternalController];

@Module({
  imports,
  controllers,
})
export class UsersExternalModule {}
