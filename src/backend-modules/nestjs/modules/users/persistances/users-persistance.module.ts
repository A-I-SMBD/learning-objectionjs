import { Module } from '@nestjs/common';
import { CreateUserUseCaseSymbol } from '../../../../../domain/modules/users/interfaces/usecases/create-user/create-user.usecase';
import { FindUserUseCaseSymbol } from '../../../../../domain/modules/users/interfaces/usecases/find-user.usecase';
import { UsersService } from '../../../../../domain/modules/users/services/users.service';
import { PasswordsPersistanceModule } from '../passwords/persistances/passwords-persistance.module';
import { UsersObjectionjsAdapter } from './repositories/objectionjs/users-objectionjs.adapter';
import { NestJsModulesRepository } from '../../../nestjs-core/repositories/modules.repository';

const adapters = [UsersObjectionjsAdapter];

const useCasesRealizations: NestJsModulesRepository.UseCaseModule[] = [
  {
    provide: CreateUserUseCaseSymbol,
    inject: [UsersObjectionjsAdapter],
    useFactory: (adapter: UsersObjectionjsAdapter) => {
      return new UsersService(adapter, adapter);
    },
  },
  {
    provide: FindUserUseCaseSymbol,
    inject: [UsersObjectionjsAdapter],
    useFactory: (adapter: UsersObjectionjsAdapter) => {
      return new UsersService(adapter, adapter);
    },
  },
];

const providers = [...adapters, ...useCasesRealizations];

const exportingModules = [
  ...useCasesRealizations.map(usecase => usecase.provide),
];

@Module({
  imports: [PasswordsPersistanceModule],
  providers,
  exports: exportingModules,
})
export class UsersPersistanceModule {}
