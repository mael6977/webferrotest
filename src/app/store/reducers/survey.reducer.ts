import { createReducer, on } from '@ngrx/store';
import { addQuestion, ResetComment, updateAnswer, updateComment } from '../actions/survey.actions';

export interface Question {
  id: string | undefined;
  questionText?: string;
  answer?: string;
  comment?: string;
}

export interface Survey {
  survey: Question[];
}

export const initialState: Survey = {
  survey: []
};

export const surveyReducer = createReducer(
  initialState,
  on(addQuestion, (state, { question }) => ({
    ...state,
    survey: [...state.survey, question]
  })),
  on(updateAnswer, (state, { id, answer }) => ({
    ...state,
    survey: state.survey.map(q =>
      q.id === id ? { ...q, answer } : q
    )
  })),
  on(updateComment, (state, { id, comment }) => ({
    ...state,
    survey: state.survey.map(q =>
      q.id === id ? { ...q, comment } : q
    )
  })),
  on(ResetComment, (state) => ({
    ...state,
    survey: []
  }))
);
