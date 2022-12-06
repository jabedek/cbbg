import { createSelector } from '@ngrx/store';
import { AppState } from '../app-state';
import { UserState } from './user.state';

export const selectUser = (state: AppState) => state.user;

export const selectUserId = createSelector(
  selectUser,
  (state: UserState) => state.data?._id
);

export const selectLoggedIn = createSelector(
  selectUser,
  (state: UserState) => state.loggedIn
);
