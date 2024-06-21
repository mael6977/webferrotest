import { BusinessReducer } from './app/store/reducers/business.reducer';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { AppComponent } from './app/app.component';
import { authReducer } from './app/store/reducers/auth.reducer';
import { AuthEffects } from './app/store/effects/auth.effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { surveyReducer } from './app/store/reducers/survey.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideStore({ auth: authReducer, business: BusinessReducer, survey: surveyReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: true
    }),
    provideRouterStore(),
  ],
}).catch(err => console.error(err));
