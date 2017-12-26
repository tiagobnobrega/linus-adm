import createSagaMiddleware from 'redux-saga';
import {watchProjects} from '../sagas'

export const sagaMiddleware = createSagaMiddleware();

export const initSagas = ()=>{
  sagaMiddleware.run(watchProjects);
}
