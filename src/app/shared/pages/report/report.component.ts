import { Component } from '@angular/core';
import { ReportDownloaderComponent } from '../../components/report-downloader/report-downloader.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ReportDownloaderComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})

export class ReportComponent {

}
