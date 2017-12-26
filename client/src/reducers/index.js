import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';

import projectsReducer from './projectsReducer';
import selectedProjectReducer from './selectedProjectReducer';
import botsReducer, {selectors as botSelectors} from './botsReducer';


const reducers = {
  routing: routerReducer,
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  bots: botsReducer,
};
export default combineReducers(reducers);

export const getBotsNames = state => botSelectors.getBotNames(state.bots);
