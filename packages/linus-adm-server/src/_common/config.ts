import * as dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();

// const logWarn = chalk.yellow;
const logError = chalk.bold.red;

export  interface EnvConfig {
  readonly database: EnvDatabaseConfig;
}

export interface EnvDatabaseConfig {
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

const parseDatabase = (): EnvDatabaseConfig => {
  const {
    DB_IMPL = 'sequelize',
    DB_DIALECT = 'sqlite',
    DB_OPTIONS = '{storage:"./data/db.sqlite"}',
  } = process.env;
  const dbImpls = ['sequelize'];

  if (dbImpls.indexOf(DB_IMPL) === -1) {
    const strErr = `Database implementation defined by env var DB_IMPL not supported. Expected one of: ${dbImpls}, found: ${DB_IMPL}`;
    logError(strErr);
    throw new ConfigurationError(strErr);
  }

  const dbDialects = ['mysql', 'sqlite', 'postgres', 'mssql'];
  if (dbDialects.indexOf(DB_DIALECT)  === -1) {
    const strErr = `Database dialect defined by env var DB_DIALECT not supported. Expected one of: ${dbDialects}, found: ${DB_DIALECT}`;
    logError(strErr);
    throw new ConfigurationError(strErr);
  }

  let dbOptions;

  try {
    dbOptions = JSON.parse(DB_OPTIONS);
  } catch (e) {
    logError(`Error parsing Database Options defined by env var DB_OPTIONS: ${e.message}`);
    throw new ConfigurationError(e);
  }

  const envConfig: EnvDatabaseConfig = {
    implementation: DB_IMPL,
    dialect: DB_DIALECT,
    options: dbOptions,
  };
  return envConfig;
};

const parse = (): EnvConfig => ({
  database: parseDatabase(),
});
export default parse();
