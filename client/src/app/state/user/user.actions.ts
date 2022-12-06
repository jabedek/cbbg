import { createAction, props } from '@ngrx/store';
import { UserData } from '../../../../../system-shared/models/user.model';

export const login = createAction(
  '[Auth] User Login',
  props<{ data: UserData }>()
);

export const logout = createAction('[Auth] User Logout');
