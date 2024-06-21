import { createAction, props } from '@ngrx/store';

export const setSelectedBusiness = createAction(
  '[Audit Flow] Set Selected Business ID',
  props<{
    id: string,
    province: string,
    locality: string,
    distributor: string,
    address: string,
    establishment: string,
    audits: []
  }>()
);
