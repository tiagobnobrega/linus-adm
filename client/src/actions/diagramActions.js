import {createAction} from 'redux-actions';

export const TYPES = {
  'DIAGRAM_GET_NODES': 'DIAGRAM_GET_NODES',
  'DIAGRAM_GET_NODES_REQUEST': 'DIAGRAM_GET_NODES_REQUEST',
  'DIAGRAM_GET_NODES_SUCCESS': 'DIAGRAM_GET_NODES_SUCCESS',
  'DIAGRAM_GET_NODES_FAIL': 'DIAGRAM_GET_NODES_FAIL',

  'DIAGRAM_CREATE_RULE': 'DIAGRAM_CREATE_RULE',
  'DIAGRAM_EDIT_RULE': 'DIAGRAM_EDIT_RULE',
  'DIAGRAM_UPDATE_RULE': 'DIAGRAM_UPDATE_RULE',
  'DIAGRAM_REMOVE_RULE': 'DIAGRAM_REMOVE_RULE',

  'DIAGRAM_CREATE_DIALOG': 'DIAGRAM_CREATE_DIALOG',
  'DIAGRAM_EDIT_DIALOG': 'DIAGRAM_EDIT_DIALOG',
  'DIAGRAM_UPDATE_DIALOG': 'DIAGRAM_UPDATE_DIALOG',
  'DIAGRAM_REMOVE_DIALOG': 'DIAGRAM_REMOVE_DIALOG',

  'DIAGRAM_SAVE': 'DIAGRAM_SAVE',
  'DIAGRAM_SAVE_REQUEST': 'DIAGRAM_SAVE_REQUEST',
  'DIAGRAM_SAVE_SUCCESS': 'DIAGRAM_SAVE_SUCCESS',
  'DIAGRAM_SAVE_FAIL': 'DIAGRAM_SAVE_FAIL',

  'DIAGRAM_SAVE_AND_RELOAD': 'DIAGRAM_SAVE_AND_RELOAD',
};

export const getAllNodes = createAction(TYPES.DIAGRAM_GET_NODES, botId=>botId);
export const getAllNodesRequest = createAction(TYPES.DIAGRAM_GET_NODES_REQUEST);
export const getAllNodesSuccess = createAction(TYPES.DIAGRAM_GET_NODES_SUCCESS, nodes => nodes);
export const getAllNodesFail = createAction(TYPES.DIAGRAM_GET_NODES_FAIL, error => (error));

export const createRule = createAction(TYPES.DIAGRAM_CREATE_RULE, ({x,y}) => ({x,y}));
export const editRule = createAction(TYPES.DIAGRAM_EDIT_RULE);
export const updateRules = createAction(TYPES.DIAGRAM_UPDATE_RULE, rules => rules);
export const removeRules = createAction(TYPES.DIAGRAM_REMOVE_RULE, rules => rules);

export const createDialog = createAction(TYPES.DIAGRAM_CREATE_DIALOG, ({x,y}) => ({x,y}));
export const editDialog = createAction(TYPES.DIAGRAM_EDIT_DIALOG);
export const updateDialogs = createAction(TYPES.DIAGRAM_UPDATE_DIALOG, dialogs => dialogs);
export const removeDialogs = createAction(TYPES.DIAGRAM_REMOVE_DIALOG, dialogs => dialogs);

export const saveDiagram = createAction(TYPES.DIAGRAM_SAVE);
export const saveDiagramRequest = createAction(TYPES.DIAGRAM_SAVE_REQUEST);
export const saveDiagramSuccess = createAction(TYPES.DIAGRAM_SAVE_SUCCESS);
export const saveDiagramFail = createAction(TYPES.DIAGRAM_SAVE_FAIL, error => (error));

export const saveAndReloadDiagram = createAction(TYPES.DIAGRAM_SAVE_AND_RELOAD, nodes => (nodes));
