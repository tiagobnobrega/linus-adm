import {put, all} from 'redux-saga/effects';
import {apiGetSaga, apiPostSaga} from './apiSagas'
import * as actions from '../actions/diagramActions';

export function* getAllNodesSaga({payload: botId}) {
  yield put(actions.getAllNodesRequest());
  try {
    const [dialogs, rules] = yield all([
      apiGetSaga({
        url: `/api/dialogs?botId=${botId}`,
      }),
      apiGetSaga({
        url: `/api/rules?botId=${botId}`,
      })
    ])
    yield put(actions.getAllNodesSuccess({dialogs,rules,botId}));
  } catch (err) {
    console.error(err);
    yield put(actions.getAllNodesFail(err));
  }
};

export function* saveBotSaga({payload}) {
  // yield apiPostSaga({
  //   url: '/api/bot',
  //   postData: payload,
  //   requestAction: actions.getAllBotsRequest,
  //   successAction: actions.saveBotSuccess,
  //   failAction: actions.saveBotFail
  // });
}

export function* removeBotSaga({payload}) {
  // yield apiPostSaga({
  //   url: '/api/bots/remove',
  //   postData: [payload],
  //   requestAction: actions.removeBotRequest,
  //   successAction: actions.removeBotSuccess,
  //   failAction: actions.removeBotFail
  // });
}

export function* removeAndReloadBotSaga(action) {
  // yield* removeBotSaga(action);
}

export function* saveAndReloadBotSaga(action) {
  // yield* saveBotSaga(action);
  // yield put(actions.getProjectByCode(action.payload.bot.-));
}
