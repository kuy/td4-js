import { createAction } from 'redux-actions';

export type ActionType = 'CLOCK' | 'RESET' | 'TOGGLE';
export type Action = {
  type: ActionType,
  payload?: any,
  meta?: any,
};

export const CLOCK: ActionType = 'CLOCK';
export const RESET: ActionType = 'RESET';
export const clock = createAction(CLOCK);
export const reset = createAction(RESET);

export const TOGGLE: ActionType = 'TOGGLE';
export const toggle = createAction(TOGGLE);
