export interface EnvConfig {
  readonly database: EnvDatabaseConfig;
}
export interface EnvDatabaseConfig {
  readonly implementation: string;
  readonly dialect: string;
  readonly options?: any;
}
export declare class ConfigurationError extends Error {
  constructor(message?: string);
}
declare const _default: EnvConfig;
export default _default;
