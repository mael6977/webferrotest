import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../../../core/services/report.service';
import { saveAs } from 'file-saver';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap, of, finalize } from 'rxjs';


@Component({
  selector: 'app-report-downloader',
  standalone: true,
  templateUrl: './report-downloader.component.html',
  styleUrls: ['./report-downloader.component.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe , MatProgressSpinnerModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDownloaderComponent implements OnInit{
  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private reportService: ReportService, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
    });
  }
  ngOnInit(): void {}

  downloadReport(): void {
    const { startDate, endDate } = this.form.value;
    if (startDate && endDate) {
      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = this.formatDate(endDate);
      this.loading = true;
      this.cdr.markForCheck();
      this.reportService.downloadReport(formattedStartDate, formattedEndDate).pipe(
        tap((blob: Blob) => {
          const fileName = `audits-${formattedStartDate}-${formattedEndDate}.xlsx`;
          saveAs(blob, fileName);
        }),
        catchError((error: any) => {
          console.error('Error downloading the report:', error);
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      ).subscribe();
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
