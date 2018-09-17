import { IEnvConfig } from '../config/config.provider';

const daoUseFactory = filename => async (envConfig: IEnvConfig, ...args) => {
  const implementation = await import(filename.replace('.ts', `.${envConfig.database.implementation}.ts`));
  return new implementation.default(args);
};

export default daoUseFactory;
