import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Audit {
  auditor: string;
  business: string;
  visit: number;
  answer0: string;
  commentAnswer0: string;
  answer1: string;
  commentAnswer1: string;
  answer2: string;
  commentAnswer2: string;
  answer3: string;
  commentAnswer3: string;
  answer4: string;
  commentAnswer4: string;
  answer5: string;
  commentAnswer5: string;
  answer6: string;
  commentAnswer6: string;
  answer7: string;
  commentAnswer7: string;
  answer8: string;
  commentAnswer8: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postAudit(audit: Audit): Observable<Audit> {
    const url = `${this.baseUrl}/audits`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Audit>(url, audit, { headers });
  }
}
