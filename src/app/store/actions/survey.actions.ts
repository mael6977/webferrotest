import { createAction, props } from '@ngrx/store';

export const updateCountFridge = createAction(
  '[Survey] Update Count Fridge',
  props<{ countFridge: number }>()
);

export const updateHeaderSurvey = createAction(
  '[Survey] Update Header Survey',
  props<{ establishment:string, auditor:string, distribuitor:string, visit:number }>()
);
export const updateResultAudit = createAction(
  '[Survey] Update Result Audit',
  props<{result:string, resultComment:string}>()
);
export const updateManyAnswer = createAction(
  '[Survey] Update Many Answer',
  props<{questions:{ id: number; answer: string}[] }>()
);

export const resetComment = createAction(
  '[Survey] Reset Suervey'
);

export const sendAudit = createAction(
  '[Survey] Send Audit');
