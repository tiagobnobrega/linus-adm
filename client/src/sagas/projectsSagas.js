import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* getAllProjectsSaga(action){
  yield put(actions.getAllProjectsRequest());
   const response = yield axios.get('/api/project/all');
  yield put(actions.getAllProjectsSuccess(response.data.data));
};

export function* getProjectByIdSaga({payload}){
  yield put(actions.getProjectByCodeRequest());
  const response = yield axios.get('/api/project/findByCode/' + payload.code);
  yield put(actions.getProjectByCodeSuccess(response.data.data));
};

export function* saveProjectSaga({payload}){
  yield put(actions.saveProjectRequest());
  const response = yield axios.post('/api/project/save',payload.project);
  yield put(actions.saveProjectSuccess(response.data.data));
}

export function* removeProjectSaga({payload}){
  yield put(actions.removeProjectRequest());
  const response = yield axios.post('/api/project/remove',[payload.code]);
  yield put(actions.removeProjectSuccess(response.data.data));
}

export  function* removeAndReloadProjectsSaga(action) {
  yield* removeProjectSaga(action);
  yield* getAllProjectsSaga();
}

export  function* saveAndReloadProjectsSaga(action) {
  yield* saveProjectSaga(action);
  yield* getAllProjectsSaga();
  yield put(actions.getProjectByCode(action.payload.project.code));
}
