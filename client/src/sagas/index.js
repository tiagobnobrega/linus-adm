import {takeEvery, takeLatest} from 'redux-saga/effects';

import {
  getAllProjectsSaga, getProjectByIdSaga, removeAndReloadProjectsSaga, saveAndReloadProjectsSaga
} from './projectsSagas';
import {TYPES} from '../actions';

export function* watchProjects() {
  yield takeEvery(TYPES.PROJECT_GET_ALL, getAllProjectsSaga);
  yield takeLatest(TYPES.PROJECT_GET_ONE, getProjectByIdSaga);
  yield takeLatest(TYPES.PROJECT_REMOVE_AND_RELOAD, removeAndReloadProjectsSaga);
  yield takeLatest(TYPES.PROJECT_SAVE_AND_RELOAD, saveAndReloadProjectsSaga);
}
