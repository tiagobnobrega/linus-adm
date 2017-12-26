import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';

import projectsReducer from './projectsReducer';
import selectedProjectReducer from './selectedProjectReducer';

const reducers = {
  routing: routerReducer,
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
};
export default combineReducers(reducers);
