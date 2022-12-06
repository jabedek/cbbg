import {
  UserData,
  UserDataWithToken,
  UserSocketSessionData,
} from '../../../../../system-shared/models/user.model';

export interface UserState {
  loggedIn: boolean;
  data: UserDataWithToken | undefined;
  currentSocketSession: UserSocketSessionData | undefined;
}

export interface AuthState {
  loggedIn: boolean;
  accessToken: string | undefined;
}
