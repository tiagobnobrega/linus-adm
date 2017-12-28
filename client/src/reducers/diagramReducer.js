import {TYPES} from '../actions/actionTypes';
import {handleActions} from 'redux-actions';
import _uniqueId from 'lodash/uniqueId';
import _castArray from 'lodash/castArray';
import _keyBy from 'lodash/keyBy';

// the initial state of this reducer
export const INITIAL_STATE = {
  botId: undefined,
  rules: [],
  dialogs: [],

  isFetching: false,
  lastFetchingStatus: undefined,
  lastFetchingMessage: undefined,

  isSaving: false,
  lastSavingStatus: undefined,

  selectedRule: undefined,
  selectedDialog: undefined,
};

export const HANDLERS = {
  [TYPES.DIAGRAM_GET_NODES_REQUEST]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return {...state, isFetching: true};
  },
  [TYPES.DIAGRAM_GET_NODES_SUCCESS]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const {dialogs, rules, botId} = payload;
    return {
      ...state,
      dialogs,
      rules,
      botId,
      isFetching: false,
      lastFetchingStatus: 'success',
    };
  },
  [TYPES.DIAGRAM_GET_NODES_FAIL]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return {
      ...state,
      isFetching: false,
      lastFetchingStatus: 'error',
      lastFetchingMessage: `An error occurred loading the diagram nodes: ${payload.message}`
    };
  },
  [TYPES.DIAGRAM_UPDATE_DIALOG]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const actionDialogs =_castArray(payload);
    if(!payload || actionDialogs.length===0){
      return state;
    }
    const dialogs = updateDialogs(state, actionDialogs);
    return {
      ...state,
      dialogs,
    }
  },
  [TYPES.DIAGRAM_CREATE_DIALOG]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const {botId} = state;
    const {x, y} = payload;
    const newDialog = createDefaultDialog({x, y, botId});
    const dialogs = [...state.dialogs,newDialog];
    return {
      ...state,
      dialogs,
    }
  },
  [TYPES.DIAGRAM_REMOVE_DIALOG]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const actionDialogs = _castArray(payload);
    if(!payload || actionDialogs.length===0){
      return state;
    }
    const dialogs = removeDialogs(state, actionDialogs);
    return {
      ...state,
      dialogs,
    }
  },
  [TYPES.DIAGRAM_CREATE_RULE]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const {botId} = state;
    const {x, y} = payload;
    const newRule = createDefaultRule({x, y, botId});
    const rules = [...state.rules , newRule];
    return {
      ...state,
      rules,
    }
  },
  [TYPES.DIAGRAM_UPDATE_RULE]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const actionRules = _castArray(payload);
    if(!payload || actionRules.length===0) return state;
    const rules = updateRules(state, actionRules);
    return {
      ...state,
      rules,
    }
  },
  [TYPES.DIAGRAM_REMOVE_RULE]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const actionRules = _castArray(payload);
    if(!payload || actionRules.length===0) return state;
    const rules = removeRules(state, actionRules);
    return {
      ...state,
      rules,
    }
  }

};

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
// eslint-disable-next-line no-mixed-operators
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
};

const createDefaultDialog = ({x, y, botId}) => {
  return {
    _id: uuidv4(),
    id: `DIALOG_${_uniqueId()}`,
    botId,
    meta: {x, y, color: "rgba(255,0,0,1)"},
    updated: true,
    isNew: true,
  }
};

const createDefaultRule = ({x, y, botId}) => {
  return {
    _id: uuidv4(),
    id: `RULE_${_uniqueId()}`,
    botId,
    meta: {x, y},
    updated: true,
    isNew: true,
    actions: [],
  }
}

const removeNodeById = attribute => (state, removeList) => {
  console.log(removeList);
  const removedIndex = _keyBy(removeList, o => (o ? o._id: 'ERR_UNDEFINED'));
  const newAttr = [];
  return state[attribute].reduce((a, b) => {
    const removedItem = removedIndex[b._id];
    if (!removedItem) {
      a.push(b);
    } else {
      if (!removedItem.isNew) {
        a.push({
          ...removedItem,
          updated: undefined,
          removed: (removedItem ? true :undefined)
        });
      }
    }
    return a;
  }, newAttr);
};

const updateNodeById = attribute => (state, updatedList) => {
  const updatedIndex = _keyBy(updatedList, '_id');
  return state[attribute].map((e) => {
    const updatedItem = updatedIndex[e._id];
    return {
      ...e,
      ...updatedItem,
      updated: (updatedItem ? true : undefined),
    }
  });
};

const updateRules = updateNodeById('rules');//(state,updatedList)
const updateDialogs = updateNodeById('dialogs');//(state,updatedList)

const removeRules = removeNodeById('rules');//(state,removeList)
const removeDialogs = removeNodeById('dialogs');//(state,removeList)

// === Selectors ===
export const selectors = {
  'getActiveDialogs':(state) => state.dialogs.filter(e=>!e.removed),
  'getActiveRules':(state) => state.rules.filter(e=>!e.removed),
  'getUpdatedNodes': (state) => ({dialogs: state.dialogs.filter(e=>!!e.updated) , rules: state.rules.filter(e=>!!e.updated)}),
  'getRemovedNodes': (state) => ({dialogs: state.dialogs.filter(e=>!!e.removed) , rules: state.rules.filter(e=>!!e.removed)}),
};

export default handleActions(HANDLERS, INITIAL_STATE);
