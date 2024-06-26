import { SelectQueryComponent } from '../select-query/select-query.component';
import { InitStateComponent } from '../init-state/init-state.component';
import { SimpleSelectionComponent } from '../simple-selection/simple-selection.component';
import { CheckComponent } from '../check/check.component';
import { UploadPhotosComponent } from '../upload-photos/upload-photos.component';
import { componentDataOpening, componentDataFridgePresence, componentDataVisibilityMaterial, componentDataFridgeCount, componentDataProductPresence, componentCheckSelectPlaces, componentDataInitState, componentDataSelectionQuery, componentEndingQuestionData, componentUploadPhotosData, componentHowContent, componentExisteFridgeData, componentHowManyFridgeData, componentWhatBrandIsData } from '../../../core/data/components-data';
import { TextBoxComponent } from '../text-box/text-box.component';

export const steps = [
  componentDataSelectionQuery,
  componentDataInitState,
  componentDataOpening,
  componentDataFridgePresence,
  componentDataVisibilityMaterial,
  componentDataFridgeCount,
  componentDataProductPresence,
  componentCheckSelectPlaces,
  componentUploadPhotosData,
  componentEndingQuestionData,
  componentHowContent,
  componentExisteFridgeData,
  componentHowManyFridgeData,
  componentWhatBrandIsData,
];

export const componentClasses = [
  SelectQueryComponent,
  InitStateComponent,
  SimpleSelectionComponent,
  CheckComponent,
  UploadPhotosComponent,
  TextBoxComponent
];
