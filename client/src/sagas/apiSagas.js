import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/botActions';

export function* apiGetSaga({url,requestAction,successAction,failAction}){
  try {
    yield put(requestAction());
    const response = yield axios.get(url);
    yield put(successAction(response.data.data));
  }catch (err){
    console.error(err);
    yield put(failAction(err));
  }
}

export function* apiPostSaga({url,postData,requestAction,successAction,failAction}){
  try {
    yield put(requestAction());
    const response = yield axios.post(url,postData);
    yield put(successAction(response.data));
  }catch (err){
    console.error('apiPostSaga:',err);
    yield put(failAction(err));
  }
}
