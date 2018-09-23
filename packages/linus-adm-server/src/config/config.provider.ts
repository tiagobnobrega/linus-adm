import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { Logger, Injectable, Global } from '@nestjs/common';
import { IEnvDatabaseConfig, IEnvConfig } from './config.interfaces';
// const logWarn = chalk.yellow;
const logError = chalk.bold.red;

export class ConfigurationError extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

const parseDatabase = (procEnv = process.env): IEnvDatabaseConfig => {
  const { ORM_TYPE = 'sqlite', ORM_HOST, ORM_PORT, ORM_DATABASE = '../db_data/sqlie/db.sqlite', ORM_USER, ORM_PWD, ORM_EXTRA } = procEnv;
  const ormTypes = ['mysql', 'postgres', 'mariadb', 'sqlite', 'oracle', 'mssql'];

  if (ormTypes.indexOf(ORM_TYPE) === -1) {
    const strErr = `Database implementation defined by env var ORM_TYPE not supported. Expected one of: ${ormTypes}, found: ${ORM_TYPE}`;
    Logger.error(logError(strErr));
    throw new ConfigurationError(strErr);
  }

  let dbOptions;

  if (ORM_EXTRA) {
    try {
      dbOptions = JSON.parse(ORM_EXTRA);
    } catch (e) {
      Logger.error(logError(`Error parsing Database Options defined by env var DB_OPTIONS: ${e.message}`));
      throw new ConfigurationError(e);
    }
  }

  const dbConfig: IEnvDatabaseConfig = {
    type: ORM_TYPE,
    host: ORM_HOST,
    port: ORM_PORT,
    database: ORM_DATABASE,
    user: ORM_USER,
    password: ORM_PWD,
  };

  validateDbConfig(dbConfig);
  return dbConfig;
};

const validateDbConfig = (dbConfig: IEnvDatabaseConfig) => {
  const requiredMap = { sqlite: ['database'], def: ['host', 'port', 'database', 'user', 'password'] };
  const required: string[] = requiredMap[dbConfig.type] || requiredMap.def;
  const notPresent = required.filter(att => !dbConfig[att]);
  if (notPresent.length > 0) {
    throw new ConfigurationError(
      `Required attributes not found for database ORM configuration. Check .env file or environment definition. Expected: ${notPresent.join(', ')}`,
    );
  }
  if (isNaN(dbConfig.port)) throw new ConfigurationError(`Invalid value for database port. Expected Number`);
};

const envConfigFactory = (): IEnvConfig => {
  dotenv.config();
  return {
    database: parseDatabase(),
  };
};

export const EnvConfig: string = 'EnvConfig';
export const EnvConfigProvider = {
  provide: EnvConfig,
  useFactory: envConfigFactory,
  inject: [],
};
