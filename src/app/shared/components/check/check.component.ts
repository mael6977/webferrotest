import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GenericRequest,
  GenericResponse,
} from '../../../core/interface/generic.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';

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

  getStateCountFridge$:Observable<number>;
  countFridge:number=0;
  public selectedOptions: string[] = [];

  constructor(private store: Store<AppState>) {
    this.getStateCountFridge$ = this.store.select(state=>state.survey.countFridge);
  }

  ngOnInit() {
    this.getStateCountFridge$.subscribe(count=>{
      this.countFridge = count;
    });
}

  onCheckboxChange(event: Event, label: string): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedOptions.push(label);
    } else {
      this.selectedOptions = this.selectedOptions.filter(
        (option) => option !== label
      );
    }
    this.selectOption();
  }

  selectOption(): void {
    const infoOption: GenericResponse = {
      selectStep: this.dataRequest.nextStep1,
      id: this.getIdQuestionState(),
      answer: JSON.stringify(this.selectedOptions),
    };
    this.optionsSelected.emit(infoOption);
  }

  getIdQuestionState():number|undefined{
    const r = ['5','6','7'].includes(this.dataRequest.numberQuestion!) && this.countFridge===2
    ?this.dataRequest.idQuestionStateOption2
    :this.dataRequest.idQuestionStateOption1;
    return r;
  }
}
