import {put} from 'redux-saga/effects';
import {apiGetSaga,apiPostSaga} from './apiSagas'
import * as actions from '../actions/botActions';

export function* getAllBotsSaga(){
  yield apiGetSaga({
    url:'/api/bots',
    requestAction: actions.getAllBotsRequest,
    successAction:actions.getAllBotsSuccess,
    failAction:actions.getAllBotsFail
  });
};

export function* saveBotSaga({payload}){
  yield apiPostSaga({
    url:'/api/bot',
    postData:payload,
    requestAction: actions.getAllBotsRequest,
    successAction:actions.saveBotSuccess,
    failAction:actions.saveBotFail
  });
}

export function* removeBotSaga({payload}){
  yield apiPostSaga({
    url:'/api/bots/remove',
    postData:[payload],
    requestAction: actions.removeBotRequest,
    successAction:actions.removeBotSuccess,
    failAction:actions.removeBotFail
  });
}

export  function* removeAndReloadBotSaga(action) {
  yield* removeBotSaga(action);
  yield* getAllBotsSaga();
}

export  function* saveAndReloadBotSaga(action) {
  yield* saveBotSaga(action);
  yield* getAllBotsSaga();
  // yield put(actions.getProjectByCode(action.payload.bot.-));
}
