import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { GenericRequest, GenericResponse } from '../../../core/interface/generic.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-upload-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-photos.component.html',
  styleUrl: './upload-photos.component.scss'
})

export class UploadPhotosComponent {
  @ViewChildren('fileInput') fileInputs!: QueryList<any>;
  @Input() public dataRequest!: GenericRequest;
  @Output() public optionsSelected: EventEmitter<GenericResponse> = new EventEmitter<GenericResponse>();
  getStateCountFridge$:Observable<number>;
  countFridge:number=0;
  defaultImage: string = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
  images: string[] = [
    this.defaultImage,
    this.defaultImage,
    this.defaultImage
  ];

  constructor(private store: Store<AppState>) {
    this.getStateCountFridge$ = this.store.select(state=>state.survey.countFridge);
  }

  ngOnInit() {
    setTimeout(() => this.selectOption(), 1500);
    this.getStateCountFridge$.subscribe(count=>{
      this.countFridge = count;
    });
  }

  onImageClick(index: number): void {
    const fileInputArray = this.fileInputs.toArray();
    fileInputArray[index].nativeElement.click();
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getIdQuestionState():number|undefined{
    const r = ['5','6','7'].includes(this.dataRequest.numberQuestion!) && this.countFridge===2
    ?this.dataRequest.idQuestionStateOption2
    :this.dataRequest.idQuestionStateOption1;
    return r;
  }

  selectOption(): void {
    const infoOption: GenericResponse = {
      selectStep: this.dataRequest.nextStep1,
      id: this.getIdQuestionState(),
      answer: JSON.stringify([]),
    }
    this.optionsSelected.emit(infoOption);
  }

}
