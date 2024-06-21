import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { GenericRequest, GenericResponse } from '../../../core/interface/generic.interface';

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

  defaultImage: string = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
  images: string[] = [
    this.defaultImage,
    this.defaultImage,
    this.defaultImage
  ];

  ngOnInit() {
    setTimeout(()=>this.selectOption(),1500)
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

  selectOption(): void {
    const infoOption: GenericResponse = {
      Question: {
        id: this.dataRequest.numberQuestion,
        answer: JSON.stringify([]),
        comment: '',
        questionText: this.dataRequest.title,
      },
      selectedBusiness: "",
      selectStep: this.dataRequest.nextStep1,
    }
    this.optionsSelected.emit(infoOption);
  }

}
