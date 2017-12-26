import createSagaMiddleware from 'redux-saga';
import {watchProjects, watchBots} from '../sagas'

export const sagaMiddleware = createSagaMiddleware();

export const initSagas = ()=>{
  sagaMiddleware.run(watchProjects);
  sagaMiddleware.run(watchBots);
}
