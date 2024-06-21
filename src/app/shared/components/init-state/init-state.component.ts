import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GenericRequest, GenericResponse } from '../../../core/interface/generic.interface';
import { HttpClientModule } from '@angular/common/http';
import { BusinessInfoService } from '../../../core/services/business-info.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-init-state',
  standalone: true,
  imports: [CommonModule, MatIconModule, HttpClientModule],
  providers: [BusinessInfoService],
  templateUrl: './init-state.component.html',
  styleUrls: ['./init-state.component.scss']
})
export class InitStateComponent implements OnInit {
  @Input() public dataRequest!: GenericRequest;
  @Output() public optionsSelected: EventEmitter<GenericResponse> = new EventEmitter<GenericResponse>();
  businessInfo$: Observable<any>;
  public audits: number = 0;

  constructor(private store: Store<AppState>) {
    this.businessInfo$ = this.store.select(state => state.business);
  }

  ngOnInit(): void {
    this.businessInfo$.subscribe({
      next: (data) => {
        if (data && data.audits && data.establishment && data.address) {
          this.audits = data.audits.length;
          this.dataRequest.title = data.establishment;
          this.dataRequest.subTitle = data.address;
          setTimeout(()=>this.selectOption(),1000)
          this.selectOption();
        } else {
          console.error('Data is incomplete', data);
        }
      },
      error: (error) => {
        console.error('Error fetching business info:', error);
      }
    });
  }

  selectOption(): void {
    const infoOption: GenericResponse = {
      selectStep: 2,
      prevStep: 0
    };
    this.optionsSelected.emit(infoOption);
  }
}
