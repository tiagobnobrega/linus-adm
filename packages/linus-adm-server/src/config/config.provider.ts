import * as dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();

// const logWarn = chalk.yellow;
const logError = chalk.bold.red;

export interface IEnvConfig {
  readonly database: IEnvDatabaseConfig;
}

export interface IEnvDatabaseConfig {
  readonly implementation: string;
  readonly dialect: string;
  readonly options?: any;
}

export class ConfigurationError extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

const parseDatabase = (): IEnvDatabaseConfig => {
  const { DB_IMPL = 'sequelize', DB_DIALECT = 'sqlite', DB_OPTIONS = '{storage:"./data/db.sqlite"}' } = process.env;
  const dbImpls = ['sequelize', 'mock'];

  if (dbImpls.indexOf(DB_IMPL) === -1) {
    const strErr = `Database implementation defined by env var DB_IMPL not supported. Expected one of: ${dbImpls}, found: ${DB_IMPL}`;
    logError(strErr);
    throw new ConfigurationError(strErr);
  }

  const dbDialects = ['mysql', 'sqlite', 'postgres', 'mssql'];
  if (dbDialects.indexOf(DB_DIALECT) === -1) {
    const strErr = `Database dialect defined by env var DB_DIALECT not supported. Expected one of: ${dbDialects}, found: ${DB_DIALECT}`;
    // console.log(logError(strErr));
    throw new ConfigurationError(strErr);
  }

  let dbOptions;

  try {
    dbOptions = JSON.parse(DB_OPTIONS);
  } catch (e) {
    // console.log(logError(`Error parsing Database Options defined by env var DB_OPTIONS: ${e.message}`));
    throw new ConfigurationError(e);
  }

  const envConfig: IEnvDatabaseConfig = {
    implementation: DB_IMPL,
    dialect: DB_DIALECT,
    options: dbOptions,
  };
  return envConfig;
};

const parse = (): IEnvConfig => ({
  database: parseDatabase(),
});
// export default parse();

export const EnvConfigProvider = {
  provide: 'EnvConfig',
  useFactory: parse,
  inject: [],
};
