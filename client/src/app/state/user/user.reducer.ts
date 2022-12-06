import { createReducer, on } from '@ngrx/store';
import * as actions from './user.actions';
import { initialAppState } from '../app-state';

export const userReducer = createReducer(
  initialAppState.user,
  on(actions.login, (state, { data }) => {
    return { ...state, data, loggedIn: true };
  }),
  on(actions.logout, (state) => {
    return { ...state, data: undefined, loggedIn: false };
  })
);
