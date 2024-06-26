import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericRequest, GenericResponse } from '../../../core/interface/generic.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss'
})
export class TextBoxComponent implements OnInit {
  @Input() public dataRequest!: GenericRequest;
  @Output() public optionsSelected: EventEmitter<GenericResponse> = new EventEmitter<GenericResponse>();
  public comment: string = '';
  ngOnInit(): void {}
  emit() {
    const infoOption: GenericResponse = {
      selectOption: this.dataRequest.numberQuestion,
      selectStep: this.dataRequest.nextStep1,
      prevStep: this.dataRequest.prevStep,
      id: this.dataRequest.idQuestionStateOption1,
      answer: this.comment,
    };
    this.optionsSelected.emit(infoOption);
  }
}
