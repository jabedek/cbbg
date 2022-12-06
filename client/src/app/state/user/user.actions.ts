import { createAction, props } from '@ngrx/store';
import { UserDataWithToken } from '../../../../../system-shared/models/user.model';

export const login = createAction(
  '[Auth] User Login',
  props<{ data: UserDataWithToken }>()
);
