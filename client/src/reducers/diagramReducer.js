import {TYPES} from '../actions/actionTypes';
import {handleActions} from 'redux-actions';
import _uniqueId from 'lodash/uniqueId';

// the initial state of this reducer
export const INITIAL_STATE = {
  botId:undefined,
  rules: [],
  dialogs: [],

  updatedRules:[],
  removedRules:[],

  updatedDialogs:[],
  removedDialogs:[],

  isFetching: false,
  lastFetchingStatus:undefined,
  lastFetchingMessage:undefined,

  isSaving:false,
  lastSavingStatus:undefined,

  selectedRule: undefined,
  selectedDialog: undefined,
};

export const HANDLERS = {
  [TYPES.DIAGRAM_GET_NODES_REQUEST]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return { ...state, isFetching:true };
  },
  [TYPES.DIAGRAM_GET_NODES_SUCCESS]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const {dialogs,rules,botId} = payload;
    return {
      ...state,
      dialogs,
      rules,
      botId,
      isFetching:false,
      lastFetchingStatus:'success',
    };
  },
  [TYPES.DIAGRAM_GET_NODES_FAIL]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return {
      ...state,
      isFetching:false,
      lastFetchingStatus:'error',
      lastFetchingMessage:`An error occurred loading the diagram nodes: ${payload.message}`
    };
  },
  [TYPES.DIAGRAM_UPDATE_DIALOG]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const actionDialogs = payload;
    const dialogs = updateDialogs(state,actionDialogs);
    const updatedDialogs = updateUpdatedDialogs(state,actionDialogs);
    return {
      ...state,
      dialogs,
      updatedDialogs,
    }
  },
  [TYPES.DIAGRAM_CREATE_DIALOG]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const {botId} = state;
    const {x,y} = payload;
    const newDialog = createDefaultDialog({x,y,botId});
    const dialogs = updateDialogs(state,[newDialog]);
    const updatedDialogs = updateUpdatedDialogs(state,[newDialog]);
    return {
      ...state,
      dialogs,
      updatedDialogs,
    }
  },
  [TYPES.DIAGRAM_CREATE_RULE]: (state = INITIAL_STATE, {type, payload, meta}) => {
    const {botId} = state;
    const {x,y} = payload;
    const newRule = createDefaultRule({x,y,botId});
    const rules = updateRules(state,[newRule]);
    const updatedDialogs = updateUpdatedRules(state,[newRule]);
    return {
      ...state,
      rules,
      updatedDialogs,
    }
  }
};

const uuidv4 =()=> {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
// eslint-disable-next-line no-mixed-operators
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
};

const createDefaultDialog = ({x,y,botId})=>{
  return {
    _id:uuidv4(),
    id:`DIALOG_${_uniqueId()}`,
    botId,
    meta:{x, y, color: "rgba(255,0,0,1)"}
  }
};

const createDefaultRule = ({x,y,botId})=>{
  return {
    _id:uuidv4(),
    id:`RULE_${_uniqueId()}`,
    botId,
    meta:{x, y},
    actions:[],
  }
}

const updateNodeById = attribute => (state,updatedList) =>{
  let newStateAttr = [...state[attribute]];
  updatedList.forEach((updated)=>{
    const elIndex = newStateAttr.findIndex((e)=>e._id===updated._id);
    if(elIndex>-1){
      newStateAttr.splice(elIndex,1,updated);
    }else{
      newStateAttr.push(updated);
    }
  });
  return newStateAttr;
};

const updateRules = updateNodeById('rules');//(state,updatedList)
const updateUpdatedRules = updateNodeById('updatedRules');//(state,updatedList)
const updateDialogs = updateNodeById('dialogs');//(state,updatedList)
const updateUpdatedDialogs = updateNodeById('updatedDialogs');//(state,updatedList)

// === Selectors ===

export default handleActions(HANDLERS,INITIAL_STATE);
