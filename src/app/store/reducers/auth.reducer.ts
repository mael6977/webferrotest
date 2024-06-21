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

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, id, role }) => ({
    ...state,
    token,
    id,
    role,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logout, state => ({
    ...state,
    token: null,
    id: null,
    role: null,
    error: null
  }))
);
