import { createReducer, on } from '@ngrx/store';
import * as BusinessActions from '../actions/business.actions';

export interface BusinessState {
  id: String | null,
  province: String | null,
  locality: String | null,
  distributor: String | null,
  address: String | null,
  establishment: String | null,
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

export const BusinessReducer = createReducer(
  initialBusinessState,
  on(BusinessActions.setSelectedBusiness, (state, { id, province, locality, distributor, address, establishment, audits }) => ({
    ...state,
    id,
    province,
    locality,
    distributor,
    address,
    establishment,
    audits
  }))
);
