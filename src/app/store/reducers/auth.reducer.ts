import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: any;
  token: string | null;
  id: string | null;
  role: string | null;
  error: any | null;
}

export const initialState: AuthState = {
  token: null,
  role: null,
  id: null,
  error: null,
  isAuthenticated: undefined
};

function logStateChange(actionName: string, prevState: AuthState, nextState: AuthState) {
  console.log(`${actionName} Action Triggered`);
  console.log('Previous State:', prevState);
  console.log('New State:', nextState);
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, id, role }) => {
    const newState = {
      ...state,
      token,
      id,
      role,
      error: null
    };
    logStateChange('loginSuccess', state, newState);
    return newState;
  }),
  on(AuthActions.loginFailure, (state, { error }) => {
    const newState = {
      ...state,
      error
    };
    logStateChange('loginFailure', state, newState);
    return newState;
  }),
  on(AuthActions.logout, state => {
    const newState = {
      ...state,
      token: null,
      id: null,
      role: null,
      error: null
    };
    logStateChange('logout', state, newState);
    return newState;
  })
)
