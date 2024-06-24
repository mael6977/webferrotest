import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GenericRequest,
  GenericResponse,
} from '../../../core/interface/generic.interface';
import { FormsModule } from '@angular/forms';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-simple-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simple-selection.component.html',
  styleUrls: ['./simple-selection.component.scss'],
})
export class SimpleSelectionComponent implements OnInit {
  @Input() public dataRequest!: GenericRequest;
  @Output() public optionsSelected: EventEmitter<GenericResponse> =
    new EventEmitter<GenericResponse>();

  public selectedOption: string | number | null | undefined = null;
  public firstOptionText!: string | undefined;
  public secondOptionText!: string | undefined;
  public showTextBox: Boolean = false;

  select1: boolean = false;
  select2: boolean = false;

  selectedStep!: number | undefined;
  optionText!: string | undefined;

  comment: string = '';
  idBusiness$!: any;
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.firstOptionText = this.dataRequest.option1;
    this.secondOptionText = this.dataRequest.option2;
    this.store.select(state => state.business).subscribe(data => {
      if (this.dataRequest.numberQuestion == "2" && data.distributor != "CAMY") {
        const a = "Camy";
        const b = "Ferrero";
        if (this.dataRequest.subTitle) {
          this.dataRequest.subTitle = this.dataRequest.subTitle.replace(a, b);
        }
      }
    });
  }

  selectOption1(optionText: string | undefined): void {
    this.select1 = true;
    this.select2 = false;
    this.showTextBox = false;
    let selectedStep: number | undefined;
    if (optionText === this.firstOptionText) {
      selectedStep = this.dataRequest.nextStep1;
    }
    const infoOption: GenericResponse = {
      selectOption: this.dataRequest.numberQuestion,
      selectStep: selectedStep,
      prevStep: this.dataRequest.prevStep,
      Question: {
        id: this.dataRequest.numberQuestion,
        answer: optionText,
        comment: this.comment,
        questionText: this.dataRequest.title,
      },
    };
    this.comment = '';
    this.selectedOption = optionText;
    this.optionsSelected.emit(infoOption);
  }

  selectOption2(optionText: string | undefined): void {
    this.select1 = false;
    this.select2 = true;
    this.optionText = optionText;
    this.showTextBox =
      !this.showTextBox && this.dataRequest.numberQuestion !== '4';
    if (optionText === this.secondOptionText) {
      this.selectedStep = this.dataRequest.nextStep2;
    }
    if (this.dataRequest.numberQuestion === '4') {
      const infoOption: GenericResponse = {
        selectOption: this.dataRequest.numberQuestion,
        selectStep: this.dataRequest.nextStep1,
        prevStep: this.dataRequest.prevStep,
        Question: {
          id: this.dataRequest.numberQuestion,
          answer: optionText,
          comment: this.comment,
          questionText: this.dataRequest.title,
        },
      };
      this.comment = '';
      this.selectedOption = optionText;
      this.optionsSelected.emit(infoOption);
    }
  }
  emit() {
    const infoOption: GenericResponse = {
      selectOption: this.dataRequest.numberQuestion,
      selectStep: this.dataRequest.nextStep2,
      prevStep: this.dataRequest.prevStep,
      Question: {
        id: this.dataRequest.numberQuestion,
        answer: this.optionText,
        comment: this.comment,
        questionText: this.dataRequest.title,
      },
    };
    this.selectedOption = this.optionText;
    this.optionsSelected.emit(infoOption);
  }
}
