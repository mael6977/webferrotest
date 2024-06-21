import { createAction, props } from '@ngrx/store';
import { Question } from '../reducers/survey.reducer';

export const addQuestion = createAction(
  '[Survey] Add Question',
  props<{ question: Question }>()
);

export const updateAnswer = createAction(
  '[Survey] Update Answer',
  props<{ id: string; answer: string }>()
);

export const updateComment = createAction(
  '[Survey] Update Comment',
  props<{ id: string; comment: string }>()
);
