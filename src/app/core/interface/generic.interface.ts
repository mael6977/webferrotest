import { Question } from './../../store/reducers/survey.reducer';
export interface GenericRequest {
  numberQuestion?: string;
  title?: string;
  subTitle?: string;
  option1?: string;
  option2?: string;
  nextStep1?: number;
  nextStep2?: number;
  prevStep?: number;
  check1?: string;
  check2?: string;
  check3?: string;
  check4?: string;
}

export interface GenericResponse {
  selectOption?: string;
  selectStep?: number;
  prevStep?: number;
  selectedBusiness?: string;
  Question?: Question;
}
