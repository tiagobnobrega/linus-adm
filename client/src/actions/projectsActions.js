import {createAction} from 'redux-actions';

export const TYPES = {
  'PROJECT_GET_ALL': 'PROJECT_GET_ALL',
  'PROJECT_GET_ALL_REQUEST':'PROJECT_GET_ALL_REQUEST',
  'PROJECT_GET_ALL_SUCCESS': 'PROJECT_GET_ALL_SUCCESS',
  'PROJECT_GET_ALL_FAIL': 'PROJECT_GET_ALL_FAIL',

  'PROJECT_SELECT': 'PROJECT_SELECT',

  'PROJECT_GET_ONE': 'PROJECT_GET_ONE',
  'PROJECT_GET_ONE_REQUEST': 'PROJECT_GET_ONE_REQUEST',
  'PROJECT_GET_ONE_SUCCESS': 'PROJECT_GET_ONE_SUCCESS',
  'PROJECT_GET_ONE_FAIL': 'PROJECT_GET_ONE_FAIL',

  'PROJECT_SAVE': 'PROJECT_SAVE',
  'PROJECT_SAVE_REQUEST': 'PROJECT_SAVE_REQUEST',
  'PROJECT_SAVE_SUCCESS': 'PROJECT_SAVE_SUCCESS',
  'PROJECT_SAVE_FAIL': 'PROJECT_SAVE_FAIL',

  'PROJECT_REMOVE': 'PROJECT_REMOVE',
  'PROJECT_REMOVE_REQUEST': 'PROJECT_REMOVE_REQUEST',
  'PROJECT_REMOVE_SUCCESS': 'PROJECT_REMOVE_SUCCESS',
  'PROJECT_REMOVE_FAIL': 'PROJECT_REMOVE_FAIL',

  'PROJECT_REMOVE_AND_RELOAD': 'PROJECT_REMOVE_AND_RELOAD',
  'PROJECT_SAVE_AND_RELOAD': 'PROJECT_SAVE_AND_RELOAD',

};

export const getAllProjects = createAction(TYPES.PROJECT_GET_ALL);
export const getAllProjectsRequest = createAction( TYPES.PROJECT_GET_ALL_REQUEST);
export const getAllProjectsSuccess = createAction( TYPES.PROJECT_GET_ALL_SUCCESS, projects=>projects );
export const getAllProjectsFail = createAction( TYPES.PROJECT_GET_ALL_FAIL, error=>(error) );

export const getProjectByCode = createAction(TYPES.PROJECT_GET_ONE,code=>({code}));
export const getProjectByCodeRequest = createAction(TYPES.PROJECT_GET_ONE_REQUEST);
export const getProjectByCodeFail = createAction(TYPES.PROJECT_GET_ONE_FAIL, error=>(error));
export const getProjectByCodeSuccess = createAction(TYPES.PROJECT_GET_ONE_SUCCESS, projects=>projects);

export const  setSelectedProject =  createAction(TYPES.PROJECT_SELECT,project=>project);

export const saveProject = createAction(TYPES.PROJECT_SAVE, (project) => ({project}));
export const saveProjectRequest =  createAction(TYPES.PROJECT_SAVE_REQUEST);
export const saveProjectSuccess =  createAction(TYPES.PROJECT_SAVE_SUCCESS);
export const saveProjectFail =  createAction(TYPES.PROJECT_SAVE_FAIL);

export const removeProject = createAction(TYPES.PROJECT_REMOVE, (code) => ({code}));
export const removeProjectRequest =  createAction(TYPES.PROJECT_REMOVE_REQUEST);
export const removeProjectSuccess =  createAction(TYPES.PROJECT_REMOVE_SUCCESS);
export const removeProjectFail =  createAction(TYPES.PROJECT_REMOVE_FAIL);


export const removeAndReload = createAction(TYPES.PROJECT_REMOVE_AND_RELOAD, (code) => ({code}));
export const saveAndReload = createAction(TYPES.PROJECT_SAVE_AND_RELOAD, (project) => ({project}));
