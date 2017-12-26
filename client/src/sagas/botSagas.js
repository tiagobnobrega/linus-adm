import {put} from 'redux-saga/effects';
import axios from 'axios';
import {apiGetSaga,apiPostSaga} from './apiSagas'
import * as actions from '../actions/botActions';

export function* getAllBotsSaga(){
  yield apiGetSaga({
    url:'/api/bots',
    requestAction: actions.getAllBotsRequest,
    successAction:actions.getAllBotsSuccess,
    failAction:actions.getAllBotsFail
  });
  // yield put(actions.getAllBotsRequest());
  //  const response = yield axios.get('/api/bots');
  // yield put(actions.getAllBotsSuccess(response.data.data));
};

export function* saveBotSaga({payload}){
  yield put(actions.getAllBotsRequest());
  const response = yield axios.post('/api/bot',payload);
  yield put(actions.saveBotSuccess(response.data.data));
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
