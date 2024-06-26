import { GenericRequest } from '../interface/generic.interface';

export const selectionQueryData: GenericRequest = {
  title: 'Seleccione el establecimiento a auditar',
  nextStep1: 1,
  prevStep: -1,
};

export const initStateData: GenericRequest = {
  title: 'Establecimiento 1',
  nextStep1: 2,
  prevStep: 0,
};

export const openingQuestionData: GenericRequest = {
  numberQuestion: '1',
  title: 'Apertura',
  subTitle: '¿El establecimiento se encuentra abierto?',
  option1: 'SI',
  option2: 'NO',
  idQuestionStateOption1:1,
  idQuestionStateOption2:2,
  nextStep1: 3,
  nextStep2: 0,
  prevStep: 1,
};

export const fridgePresenceQuestionData: GenericRequest = {
  numberQuestion: '2',
  title: 'Nevera',
  subTitle: '¿Está la nevera Camy?',
  option1: 'SI',
  option2: 'NO',
  idQuestionStateOption1:3,
  idQuestionStateOption2:4,
  nextStep1: 4,
  nextStep2: 0,
  prevStep: 2,
};

export const visibilityMaterialQuestionData: GenericRequest = {
  numberQuestion: '3',
  title: 'Contenido',
  subTitle:
    '¿Hay algún material de visibilidad en la tienda (cartel, carta menú, cartel sobrebarra)?',
  option1: 'SI',
  option2: 'NO',
  idQuestionStateOption1:5,
  idQuestionStateOption2:6,
  nextStep1: 5,
  nextStep2: 6,
  prevStep: 3,
};

export const fridgeCountQuestionData: GenericRequest = {
  numberQuestion: '4',
  title: 'Nevera',
  subTitle: '¿Cuantas neveras Ferrero hay?',
  option1: '1',
  option2: '2',
  idQuestionStateOption1:8,
  idQuestionStateOption2:8,
  nextStep1: 7,
  nextStep2: 7,
  prevStep: 5,
};

export const productPresenceQuestionData: GenericRequest = {
  numberQuestion: '5',
  title: 'Producto',
  subTitle:
    '¿En la nevera Ferrero solo está el producto Ferrero single service?',
  option1: 'SI',
  option2: 'NO',
  idQuestionStateOption1:9,
  idQuestionStateOption2:10,
  nextStep1: 8,
  nextStep2: 8,
  prevStep: 6,
};

export const checkSelectPlaces: GenericRequest = {
  numberQuestion: '6',
  title: 'Lugar',
  subTitle: '¿Dónde está ubicada la nevera?',
  check1: 'Exterior',
  check2: 'Interior entrada',
  check3: 'Interior salida de caja',
  check4: 'Interior resto',
  idQuestionStateOption1:11,
  idQuestionStateOption2:15,
  nextStep1: 9,
  prevStep: 7,
};

export const checkSelectContent: GenericRequest = {
  numberQuestion: '3',
  title: 'Contenido',
  subTitle: '¿Cuales?',
  check1: 'Cartel',
  check2: 'Cartel exterior caballete',
  check3: 'Carta menú restaurante',
  check4: 'Cartel sobrebarra',
  idQuestionStateOption1:7,
  idQuestionStateOption2:7,
  nextStep1: 6,
  prevStep: 4,
};

export const uploadPhotosData: GenericRequest = {
  numberQuestion: '7',
  title: 'Fotos',
  subTitle: 'Sube fotos del lugar',
  idQuestionStateOption1:12,
  idQuestionStateOption2:16,
  nextStep1: 10,
  prevStep: 8,
};

export const endingQuestionData: GenericRequest = {
  numberQuestion: '8',
  title: 'Estado',
  subTitle: '¿Todo esta correcto en la revisión?',
  option1: 'SI',
  option2: 'NO',
  nextStep1: 11,
  nextStep2: 11,
  prevStep: 9,
};

export const existeFridgeData: GenericRequest = {
  numberQuestion: '9',
  title: 'Extra',
  subTitle: '¿Hay neveras de la competencia en la tienda?',
  option1: 'SI',
  option2: 'NO',
  idQuestionStateOption1:17,
  idQuestionStateOption2:17,
  nextStep1: 12,
  nextStep2: 0,
  prevStep: 10,
};

export const howManyFridgeData: GenericRequest = {
  numberQuestion: '10',
  title: 'Extra',
  subTitle: '¿Cúantas?',
  option1: '',
  option2: '',
  idQuestionStateOption1:18,
  nextStep1: 13,
  nextStep2: 0,
  prevStep: 11,
};

export const whatBrandIsData: GenericRequest = {
  numberQuestion: '11',
  title: 'Extra',
  subTitle: '¿Marca?',
  option1: '',
  option2: '',
  idQuestionStateOption1:19,
  nextStep1: 0,
  nextStep2: 0,
  prevStep: 12,
};
