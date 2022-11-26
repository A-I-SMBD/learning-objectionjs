export namespace NestJsModulesRepository {
  export type UseCaseModule = {
    provide: symbol;
    inject: any[];
    useFactory: (...adapters: any) => any;
  };
}
