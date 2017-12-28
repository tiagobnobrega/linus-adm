import {put, all, call} from 'redux-saga/effects';
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
    yield put(actions.getAllNodesSuccess({dialogs, rules, botId}));
  } catch (err) {
    console.error(err);
    yield put(actions.getAllNodesFail(err));
  }
};

export function* saveAndReloadDiagramSaga(action) {
  const {botId} = action.payload;
  yield put(actions.saveDiagramRequest());
  try {
    yield all([
      call(saveDiagramSaga, action),
      call(removeDiagramSaga, action)
    ]);
    yield put(actions.saveDiagramSuccess());
  } catch (err) {
    yield put(actions.saveDiagramFail(err));
  }
  yield put(actions.getAllNodes(botId));
}

function* saveDiagramSaga({payload}) {
  const {toPersist} = payload;
  const {dialogs, rules} = toPersist;

  yield all([
      call(apiPostSaga,{url: `/api/dialogs`, postData: dialogs}),
      call(apiPostSaga,{url: `/api/rules`, postData: rules}),
  ]);
}

function* removeDiagramSaga({payload}) {
  const {toRemove} = payload;
  const {dialogs, rules} = toRemove;

  yield all([
    ...dialogs.map((d) => apiPostSaga({url: `/api/dialogs/remove`, postData: d})),
    ...rules.map((r) => apiPostSaga({url: `/api/rules/remove`, postData: r})),
  ]);
}


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
