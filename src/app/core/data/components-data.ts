import { CheckComponent } from "../../shared/components/check/check.component";
import { InitStateComponent } from "../../shared/components/init-state/init-state.component";
import { SelectQueryComponent } from "../../shared/components/select-query/select-query.component";
import { SimpleSelectionComponent } from "../../shared/components/simple-selection/simple-selection.component";
import { TextBoxComponent } from "../../shared/components/text-box/text-box.component";
import { UploadPhotosComponent } from "../../shared/components/upload-photos/upload-photos.component";
import { openingQuestionData, fridgePresenceQuestionData, visibilityMaterialQuestionData, fridgeCountQuestionData, productPresenceQuestionData, checkSelectPlaces, initStateData, selectionQueryData, endingQuestionData, uploadPhotosData, checkSelectContent, existeFridgeData, howManyFridgeData, whatBrandIsData } from "./injection-components-data";

export const componentDataSelectionQuery = {
  id: 0,
  component: SelectQueryComponent,
  data: selectionQueryData
};

export const componentDataInitState = {
  id: 1,
  component: InitStateComponent,
  data: initStateData
};

export const componentDataOpening = {
  id: 2,
  component: SimpleSelectionComponent,
  data: openingQuestionData
};

export const componentDataFridgePresence = {
  id: 3,
  component: SimpleSelectionComponent,
  data: fridgePresenceQuestionData
};

export const componentDataVisibilityMaterial = {
  id: 4,
  component: SimpleSelectionComponent,
  data: visibilityMaterialQuestionData
};

export const componentHowContent = {
  id: 5,
  component: CheckComponent,
  data: checkSelectContent
};

export const componentDataFridgeCount = {
  id: 6,
  component: SimpleSelectionComponent,
  data: fridgeCountQuestionData
};

export const componentDataProductPresence = {
  id: 7,
  component: SimpleSelectionComponent,
  data: productPresenceQuestionData
};

export const componentCheckSelectPlaces = {
  id: 8,
  component: CheckComponent,
  data: checkSelectPlaces
};

export const componentUploadPhotosData = {
  id: 9,
  component: UploadPhotosComponent,
  data: uploadPhotosData
};

export const componentEndingQuestionData = {
  id: 10,
  component: SimpleSelectionComponent,
  data: endingQuestionData
};

export const componentExisteFridgeData = {
  id: 11,
  component: SimpleSelectionComponent,
  data: existeFridgeData
};

export const componentHowManyFridgeData = {
  id: 12,
  component: TextBoxComponent,
  data: howManyFridgeData
};

export const componentWhatBrandIsData = {
  id: 13,
  component: TextBoxComponent,
  data: whatBrandIsData
};









