import { createAction, props } from '@ngrx/store';

export const loadBooks = createAction(
  '[Book] Load Books'
);

export const successAction = createAction('[Book] Success');
export const errorAction = createAction('[Book] Error');
export const globalErrorAction = createAction('[Book] Global Error');






