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
  idQuestionStateOption1?:number;
  idQuestionStateOption2?:number;
}

export interface GenericResponse {
  selectOption?: string;
  selectStep?: number;
  prevStep?: number;
  id?: number,
  answer?: string,
  idComment?:number,
  comment?:string
}
