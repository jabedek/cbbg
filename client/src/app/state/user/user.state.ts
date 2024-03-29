import {
  UserData,
  UserSocketSessionDataWithSocket,
} from '../../../../../system-shared/models/user.model';

export interface UserState {
  loggedIn: boolean;
  data: UserData | undefined;
  currentSocketSession: UserSocketSessionDataWithSocket | undefined;
}
