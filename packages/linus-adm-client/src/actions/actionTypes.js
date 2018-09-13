import {TYPES as projectsActionsTypes} from './projectsActions';
import {TYPES as botActionsTypes} from './botActions';
import {TYPES as diagramActionsTypes} from './diagramActions';

export const TYPES = {
  ...projectsActionsTypes,
  ...botActionsTypes,
  ...diagramActionsTypes,
}
