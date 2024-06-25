import { createReducer, on } from '@ngrx/store';
import * as BusinessActions from '../actions/business.actions';
import { resetBusiness } from '../actions/business.actions';

export interface BusinessState {
  id: string | null,
  province: string | null,
  locality: string | null,
  distributor: string | null,
  address: string | null,
  establishment: string | null,
  audits: [] | null
}

export const initialBusinessState: BusinessState = {
  id: null,
  province: null,
  locality: null,
  distributor: null,
  address: null,
  establishment: null,
  audits: null
};

function logStateChange(actionName: string, prevState: BusinessState, nextState: BusinessState) {
  console.log(`${actionName} Action Triggered`);
  console.log('Previous State:', prevState);
  console.log('New State:', nextState);
}

export const BusinessReducer = createReducer(
  initialBusinessState,
  on(BusinessActions.setSelectedBusiness, (state, { id, province, locality, distributor, address, establishment, audits }) => {
    const newState = {
      ...state,
      id,
      province,
      locality,
      distributor,
      address,
      establishment,
      audits
    };
    logStateChange('setSelectedBusiness', state, newState);
    return newState;
  }),
  on(resetBusiness, state => {
    logStateChange('resetBusiness', state, initialBusinessState);
    return initialBusinessState;
  })
);
