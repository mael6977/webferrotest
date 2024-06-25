import { BusinessState } from './reducers/business.reducer';
import { AuthState } from './reducers/auth.reducer';
import { SurveyState } from './reducers/survey.reducer';

export interface AppState {
  auth: AuthState;
  business: BusinessState;
  survey: SurveyState
}
