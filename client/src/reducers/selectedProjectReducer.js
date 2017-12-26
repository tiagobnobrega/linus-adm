import {TYPES} from '../actions/projectsActions';
import {handleActions} from 'redux-actions';

// the initial state of this reducer
export const INITIAL_STATE ={
  isFetchingLoad: false,
  isFetchingPost: false,
  isNew: false,
};

export const HANDLERS = {
  [TYPES.PROJECT_GET_ONE_REQUEST]: (state=INITIAL_STATE, {type, payload, meta} ) => {
    return Object.assign({}, state, {isFetchingLoad: true});
  },

  [TYPES.PROJECT_SELECT]: (state=INITIAL_STATE, {type, payload, meta}) => {
    return Object.assign({}, INITIAL_STATE, {...payload});
  },

  [TYPES.PROJECT_GET_ONE_SUCCESS]: (state=INITIAL_STATE, {type, payload, meta}) => {
    const projectData = payload[0];
    return Object.assign({}, state, {
      isFetchingLoad: false,
      isNew: false,
      ...projectData,
    });
  },

  [TYPES.PROJECT_SAVE_REQUEST]: (state=INITIAL_STATE, {type, payload, meta}) => {
    return Object.assign({}, state, {isFetchingPost: true})
  },

  [TYPES.PROJECT_SAVE_SUCCESS]: (state=INITIAL_STATE, {type, payload, meta}) => {
    return Object.assign({}, state, {
      isFetchingPost: false,
    });
  },

  [TYPES.PROJECT_REMOVE_REQUEST]: (state=INITIAL_STATE, {type, payload, meta}) => {
    return {
      ...state,
      isFetchingPost: true,
    }
  },

  [TYPES.PROJECT_REMOVE_SUCCESS]: (state=INITIAL_STATE, {type, payload, meta}) => {
    let nextState = {
      ...state,
      isNew: false,
      isFetchingPost: false,
    };
    delete nextState.code;
    return nextState
  }
};

export default handleActions(HANDLERS,INITIAL_STATE);
