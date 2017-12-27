import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';

import projectsReducer from './projectsReducer';
import selectedProjectReducer from './selectedProjectReducer';
import botsReducer, {selectors as botSelectors} from './botsReducer';
import diagramReducer from './diagramReducer';

const reducers = {
  routing: routerReducer,
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  bots: botsReducer,
  diagram: diagramReducer,
};
export default combineReducers(reducers);

export const getBotsNames = state => botSelectors.getBotNames(state.bots);
