import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:3200';

  constructor(private http: HttpClient) { }

  downloadReport(startDate: string, endDate: string): Observable<Blob> {
    const endpoint = '/audits/excel';
    const params = `?startDate=${startDate}&endDate=${endDate}`;
    const url = `${this.apiUrl}${endpoint}${params}`;

    return this.http.get(url, { responseType: 'blob' });
  }
}
