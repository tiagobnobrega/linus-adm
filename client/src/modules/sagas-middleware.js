import createSagaMiddleware from 'redux-saga';
import {watchProjects, watchBots, watchDiagram} from '../sagas'

export const sagaMiddleware = createSagaMiddleware();

export const initSagas = ()=>{
  sagaMiddleware.run(watchProjects);
  sagaMiddleware.run(watchBots);
  sagaMiddleware.run(watchDiagram);
}
