import daoUseFactory from '../../_common/daoUseFactory';

export const BotDao = {
  provide: 'BotDao',
  useFactory: daoUseFactory(__filename),
  inject: ['EnvConfig'],
};
