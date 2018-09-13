import {TYPES} from '../actions/actionTypes';
import {handleActions} from 'redux-actions';

// the initial state of this reducer
export const INITIAL_STATE = {
  all: [],
  isFetching: false,
};

export const HANDLERS = {
  [TYPES.PROJECT_GET_ALL_REQUEST]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return Object.assign({}, state, {isFetching: true})
  },
  [TYPES.PROJECT_GET_ALL_SUCCESS]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return {
      all: payload,
      isFetching: false,
    }
  },
};


export default handleActions(HANDLERS,INITIAL_STATE);
