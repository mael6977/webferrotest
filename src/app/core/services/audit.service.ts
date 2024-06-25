import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrl = environment.apiUrl;
  showLogout: Boolean = false;
  auditInfo$: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select(state => state.survey).subscribe(data=>{
      this.auditInfo$ = data
    })
  }

  postAudit(): Observable<any>{
    console.log("enviado")
    const url = `${this.baseUrl}/audits`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, this.auditInfo$, { headers });
  }
}
