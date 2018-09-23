export interface IEnvConfig {
  readonly database: IEnvDatabaseConfig;
}

export interface IEnvDatabaseConfig {
  readonly type: string;
  readonly host: string;
  readonly port: any;
  readonly database: any;
  readonly user: any;
  readonly password: any;
}
