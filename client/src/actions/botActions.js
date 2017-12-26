import {createAction} from 'redux-actions';

export const TYPES = {
  'BOT_GET_ALL': 'BOT_GET_ALL',
  'BOT_GET_ALL_REQUEST':'BOT_GET_ALL_REQUEST',
  'BOT_GET_ALL_SUCCESS': 'BOT_GET_ALL_SUCCESS',
  'BOT_GET_ALL_FAIL': 'BOT_GET_ALL_FAIL',

  'BOT_SELECT': 'BOT_SELECT',

  'BOT_SAVE': 'BOT_SAVE',
  'BOT_SAVE_REQUEST': 'BOT_SAVE_REQUEST',
  'BOT_SAVE_SUCCESS': 'BOT_SAVE_SUCCESS',
  'BOT_SAVE_FAIL': 'BOT_SAVE_FAIL',

  'BOT_REMOVE': 'BOT_REMOVE',
  'BOT_REMOVE_REQUEST': 'BOT_REMOVE_REQUEST',
  'BOT_REMOVE_SUCCESS': 'BOT_REMOVE_SUCCESS',
  'BOT_REMOVE_FAIL': 'BOT_REMOVE_FAIL',

  'BOT_REMOVE_AND_RELOAD': 'BOT_REMOVE_AND_RELOAD',
  'BOT_SAVE_AND_RELOAD': 'BOT_SAVE_AND_RELOAD',

};

export const getAllBots = createAction(TYPES.BOT_GET_ALL);
export const getAllBotsRequest = createAction( TYPES.BOT_GET_ALL_REQUEST);
export const getAllBotsSuccess = createAction( TYPES.BOT_GET_ALL_SUCCESS, Bots=>Bots );
export const getAllBotsFail = createAction( TYPES.BOT_GET_ALL_FAIL, error=>(error) );

export const  selectBot =  createAction(TYPES.BOT_SELECT,bot=>bot);

export const saveBot = createAction(TYPES.BOT_SAVE, (bot) => (bot));
export const saveBotRequest =  createAction(TYPES.BOT_SAVE_REQUEST);
export const saveBotSuccess =  createAction(TYPES.BOT_SAVE_SUCCESS);
export const saveBotFail =  createAction(TYPES.BOT_SAVE_FAIL);

export const removeBot = createAction(TYPES.BOT_REMOVE, (code) => ({code}));
export const removeBotRequest =  createAction(TYPES.BOT_REMOVE_REQUEST);
export const removeBotSuccess =  createAction(TYPES.BOT_REMOVE_SUCCESS);
export const removeBotFail =  createAction(TYPES.BOT_REMOVE_FAIL);


export const removeAndReloadBot = createAction(TYPES.BOT_REMOVE_AND_RELOAD, (bot) => (bot));
export const saveAndReloadBot = createAction(TYPES.BOT_SAVE_AND_RELOAD, (project) => ({project}));
