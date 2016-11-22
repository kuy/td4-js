import { createAction } from 'redux-actions';

export type Action = 'CLOCK';

export const CLOCK = 'CLOCK';
export const clock = createAction(CLOCK);
