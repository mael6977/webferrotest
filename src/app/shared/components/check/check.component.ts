import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GenericRequest,
  GenericResponse,
} from '../../../core/interface/generic.interface';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [],
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent {
  @Input() public dataRequest!: GenericRequest;
  @Output() public optionsSelected: EventEmitter<GenericResponse> =
    new EventEmitter<GenericResponse>();

  public selectedOptions: string[] = [];

  ngOnInit() {}

  onCheckboxChange(event: Event, label: string): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedOptions.push(label);
    } else {
      this.selectedOptions = this.selectedOptions.filter(
        (option) => option !== label
      );
    }
    console.log(this.selectedOptions)
    this.selectOption();
  }

  selectOption(): void {
    const infoOption: GenericResponse = {
      Question: {
        id: this.dataRequest.numberQuestion,
        answer: JSON.stringify(this.selectedOptions),
        comment: '',
        questionText: this.dataRequest.title,
      },
      selectedBusiness: '',
      selectStep: this.dataRequest.nextStep1,
    };
    this.optionsSelected.emit(infoOption);
  }
}
