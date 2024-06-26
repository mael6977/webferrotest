import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { GenericRequest, GenericResponse } from '../../../core/interface/generic.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import uploadImage from '../../../core/services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-photos',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss']
})
export class UploadPhotosComponent {
  @ViewChildren('fileInput') fileInputs!: QueryList<any>;
  @Input() public dataRequest!: GenericRequest;
  @Output() public optionsSelected: EventEmitter<GenericResponse> = new EventEmitter<GenericResponse>();

  getStateCountFridge$: Observable<number>;
  getStateBusinessId$: Observable<any>;
  countFridge: number = 0;
  businessId: any;
  defaultImage: string = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
  images: string[] = [this.defaultImage, this.defaultImage, this.defaultImage];
  loading: boolean = false;

  constructor(private store: Store<AppState>) {
    this.getStateCountFridge$ = this.store.select(state => state.survey.countFridge);
    this.getStateBusinessId$ = this.store.select(state => state.business.id);
  }

  ngOnInit() {
    this.getStateCountFridge$.subscribe(count => {
      this.countFridge = count;
    });
    this.getStateBusinessId$.subscribe(id => {
      this.businessId = id;
    });
  }

  onImageClick(index: number): void {
    const fileInputArray = this.fileInputs.toArray();
    fileInputArray[index].nativeElement.click();
  }

  async onFileSelected(event: any, index: number): Promise<void> {
    const file: File = event.target.files[0];
    if (!file) return;
    try {
      this.loading = true;
      const imageUrl: string | null = await uploadImage(file, this.businessId +" Nevera "+ this.countFridge);
      if (imageUrl) {
        this.images[index] = imageUrl;
        this.emitAnswers();
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
    } finally {
      this.loading = false;
    }
  }

  emitAnswers(): void {
    const answers = this.images
      .filter(img => img !== this.defaultImage);
    const infoOption: GenericResponse = {
      selectStep: this.dataRequest.nextStep1,
      id: this.getIdQuestionState(),
      answer: JSON.stringify(answers),
    };
    this.optionsSelected.emit(infoOption);
  }

  getIdQuestionState(): number | undefined {
    return ['5', '6', '7'].includes(this.dataRequest.numberQuestion!) && this.countFridge === 2
      ? this.dataRequest.idQuestionStateOption2
      : this.dataRequest.idQuestionStateOption1;
  }
}
