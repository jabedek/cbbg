import { UserState } from './user/user.state';

export interface AppState {
  user: UserState;
  game: {};
}

export const initialAppState: AppState = {
  user: {
    loggedIn: false,
    data: undefined,
    currentSocketSession: undefined,
  },
  game: {},
};
