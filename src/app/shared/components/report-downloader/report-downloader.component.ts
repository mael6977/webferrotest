import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../../../core/services/report.service';
import { saveAs } from 'file-saver';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-report-downloader',
  standalone: true,
  templateUrl: './report-downloader.component.html',
  styleUrls: ['./report-downloader.component.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDownloaderComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.form = this.fb.group({
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
    });
  }

  downloadReport(): void {
    const { startDate, endDate } = this.form.value;

    if (startDate && endDate) {
      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = this.formatDate(endDate);

      this.reportService.downloadReport(formattedStartDate, formattedEndDate).subscribe((blob: Blob) => {
        const fileName = `audits-${formattedStartDate}-${formattedEndDate}.xlsx`;
        saveAs(blob, fileName);
      }, (error: any) => {
        console.error('Error downloading the report:', error);
      });
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
  }
}
