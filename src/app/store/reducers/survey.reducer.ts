import { createReducer, on } from '@ngrx/store';
import { resetComment, sendAudit, updateCountFridge, updateHeaderSurvey, updateManyAnswer, updateResultAudit } from '../actions/survey.actions';

export interface Question {
  id: number;
  title: string;
  answer: string;
}

export interface SurveyState {
  countFridge: number;
  establishment: string;
  auditor: string;
  distribuitor: string;
  visit: number;
  result: string;
  resultComment: string;
  questions: Question[];
}

export const initialState: SurveyState = {
  countFridge: 0,
  establishment: "",
  auditor: "",
  distribuitor: "",
  visit: 0,
  result: "",
  resultComment: "",
  questions: [
    { id: 1, title: "APERTURA", answer: "" },
    { id: 2, title: "APERTURA COMMENT", answer: "" },
    { id: 3, title: "NEVERA", answer: "" },
    { id: 4, title: "NEVERA COMMENT", answer: "" },
    { id: 5, title: "NEVERA CONTENIDO", answer: "" },
    { id: 6, title: "NEVERA CONTENIDO COMMENT", answer: "" },
    { id: 7, title: "NEVERA CONTENIDO DETALLE", answer: "" },
    { id: 8, title: "NEVERA CANTIDAD", answer: "" },
    { id: 9, title: "PRODUCTO NEVERA 1", answer: "" },
    { id: 10, title: "PRODUCTO NEVERA 1 COMMENT", answer: "" },
    { id: 11, title: "LUGAR NEVERA 1", answer: "" },
    { id: 12, title: "FOTOS NEVERA 1", answer: "" },
    { id: 13, title: "PRODUCTO NEVERA 2", answer: "" },
    { id: 14, title: "PRODUCTO NEVERA 2 COMMENT", answer: "" },
    { id: 15, title: "LUGAR NEVERA 2", answer: "" },
    { id: 16, title: "FOTOS NEVERA 2", answer: "" }
  ]
};

function logStateChange(actionName: string, prevState: SurveyState, nextState: SurveyState) {
  console.log(`${actionName} Action Triggered`);
  console.log('Previous State:', prevState);
  console.log('New State:', nextState);
}

export const surveyReducer = createReducer(
  initialState,
  on(sendAudit, (state) => {
    const newState = { ...state };
    logStateChange('sendAudit', state, newState);
    return newState;
  }),
  on(updateCountFridge, (state, { countFridge }) => {
    const newState = {
      ...state,
      countFridge
    };
    logStateChange('updateCountFridge', state, newState);
    return newState;
  }),
  on(updateHeaderSurvey, (state, { establishment, auditor, distribuitor, visit }) => {
    const newState = {
      ...state,
      establishment,
      auditor,
      distribuitor,
      visit
    };
    logStateChange('updateHeaderSurvey', state, newState);
    return newState;
  }),
  on(updateResultAudit, (state, { result, resultComment }) => {
    const newState = {
      ...state,
      result,
      resultComment
    };
    logStateChange('updateResultAudit', state, newState);
    return newState;
  }),
  on(updateManyAnswer, (state, { questions }) => {
    const newState = {
      ...state,
      questions: state.questions.map(question => {
        const updatedQuestion = questions.find(q => q.id === question.id);
        return updatedQuestion ? { ...question, answer: updatedQuestion.answer } : question;
      })
    };
    logStateChange('updateManyAnswer', state, newState);
    return newState;
  }),
  on(resetComment, (state) => {
    logStateChange('resetComment', state, initialState);
    return initialState;
  })
);
