import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/botActions';

export function* apiGetSaga({url,requestAction,successAction,failAction}){
  try {
    if(requestAction) yield put(requestAction());
    const response = yield axios.get(url);
    if(successAction) yield put(successAction(response.data.data));
    return response.data.data;
  }catch (err){
    if(failAction){
      console.error(err);
      yield put(failAction(err));
    } else{
      throw err;
    }
  }
}

export function* apiPostSaga({url,postData,requestAction,successAction,failAction}){
  try {
    if(requestAction) yield put(requestAction());
    const response = yield axios.post(url,postData);
    if(successAction) yield put(successAction(response.data));
  }catch (err){
    if(failAction){
      console.error(err);
      yield put(failAction(err));
    } else{
      throw err;
    }
  }
}
