import { Module, Provider } from '@nestjs/common';
import { PasswordUseCaseSymbol } from '../../../../../../../domain/modules/users/modules/passwords/interfaces/usecases/password.usecase';
import { PasswordsService } from '../../../../../../../domain/modules/users/modules/passwords/services/passwords.service';
import { NestJsModulesRepository } from '../../../../../nestjs-core/repositories/modules.repository';
import { HashingPasswordBcryptAdapter } from './hashing-password/bcrypt/hashing-password-bcrypt.adapter';

const adapters = [HashingPasswordBcryptAdapter];

const useCasesRealizations: NestJsModulesRepository.UseCaseModule[] = [
  {
    provide: PasswordUseCaseSymbol,
    inject: [HashingPasswordBcryptAdapter],
    useFactory: (adapter: HashingPasswordBcryptAdapter) => {
      return new PasswordsService(adapter);
    },
  },
];

const providers: Provider<any>[] = [...adapters, ...useCasesRealizations];

const exportingModules = [
  ...useCasesRealizations.map(usecase => usecase.provide),
];

@Module({
  providers,
  exports: exportingModules,
})
export class PasswordsPersistanceModule {}
