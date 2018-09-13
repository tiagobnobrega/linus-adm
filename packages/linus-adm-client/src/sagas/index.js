import {takeEvery, takeLatest} from 'redux-saga/effects';
import {TYPES} from '../actions';

import {
  getAllProjectsSaga, getProjectByIdSaga, removeAndReloadProjectsSaga, saveAndReloadProjectsSaga
} from './projectsSagas';

import {getAllBotsSaga, removeAndReloadBotSaga,saveAndReloadBotSaga} from './botSagas';

import {getAllNodesSaga, saveAndReloadDiagramSaga} from './diagramSagas';

export function* watchProjects() {
  yield takeEvery(TYPES.PROJECT_GET_ALL, getAllProjectsSaga);
  yield takeLatest(TYPES.PROJECT_GET_ONE, getProjectByIdSaga);
  yield takeLatest(TYPES.PROJECT_REMOVE_AND_RELOAD, removeAndReloadProjectsSaga);
  yield takeLatest(TYPES.PROJECT_SAVE_AND_RELOAD, saveAndReloadProjectsSaga);
}

export function* watchBots() {
  yield takeEvery(TYPES.BOT_GET_ALL, getAllBotsSaga);
  yield takeLatest(TYPES.BOT_REMOVE_AND_RELOAD, removeAndReloadBotSaga);
  yield takeLatest(TYPES.BOT_SAVE_AND_RELOAD, saveAndReloadBotSaga);
}

export function* watchDiagram() {
  yield takeEvery(TYPES.DIAGRAM_GET_NODES, getAllNodesSaga);
  yield takeLatest(TYPES.DIAGRAM_SAVE_AND_RELOAD,saveAndReloadDiagramSaga);
}
