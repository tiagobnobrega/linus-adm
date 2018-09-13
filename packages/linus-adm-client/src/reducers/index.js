import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';

import projectsReducer from './projectsReducer';
import selectedProjectReducer from './selectedProjectReducer';
import botsReducer, {selectors as botSelectors} from './botsReducer';
import diagramReducer,{selectors as diagramSelectors} from './diagramReducer';

const reducers = {
  routing: routerReducer,
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  bots: botsReducer,
  diagram: diagramReducer,
};
export default combineReducers(reducers);

export const getBotsNames = state => botSelectors.getBotNames(state.bots);
export const getActiveRules = state =>diagramSelectors.getActiveRules(state.diagram);
export const getActiveDialogs = state =>diagramSelectors.getActiveDialogs(state.diagram);
export const getUpdatedNodes = state =>diagramSelectors.getUpdatedNodes(state.diagram);
export const getRemovedNodes = state =>diagramSelectors.getRemovedNodes(state.diagram);
