import {TYPES} from '../actions/actionTypes';
import {handleActions} from 'redux-actions';

// the initial state of this reducer
export const INITIAL_STATE = {
  allBots: [],
  isFetching: false,
  selectedBot: undefined,
};

export const HANDLERS = {
  [TYPES.BOT_GET_ALL_REQUEST]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return { ...state, isFetching:true };
  },
  [TYPES.BOT_GET_ALL_SUCCESS]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return {
      allBots: payload,
      isFetching: false,
    }
  },
  [TYPES.BOT_SELECT]:(state = INITIAL_STATE, {type, payload, meta}) => {
    const selectedBot = payload;
    return {
      ...state,
      selectedBot
    }
  }
};


// === Selectors ===

export const selectors = {
  'getBotNames':(state)=>{
    return state.allBots.map((b)=>b.name);
  }
};

export default handleActions(HANDLERS,INITIAL_STATE);
