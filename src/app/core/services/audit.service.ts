import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Question } from '../../store/reducers/survey.reducer';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { ResetComment } from '../../store/actions/survey.actions';
@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrl = environment.apiUrl;
  showLogout: Boolean = false;
  idUser$: any;
  idBusiness$: any;
  auditInfo$: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select(state => state.auth.id).subscribe(data=>{
      this.idUser$ = data;
    });
    this.store.select(state => state.business).subscribe(data=>{
      this.idBusiness$ = data;
    });
    this.store.select(state => state.survey.survey).subscribe(data=>{
      this.auditInfo$ = data
    })
  }

  postAudit(): Observable<Question>{
    const dataToSend = {
      idComercio: this.idBusiness$.id,
      idAuditor: this.idUser$,
      producto: this.idBusiness$.distributor,
      visita: this.idBusiness$.audits.length,
      apertura: this.auditInfo$[0]?.answer || "NO",
      aperturaComment: this.auditInfo$[0]?.comment || "",
      nevera: this.auditInfo$[1]?.answer || "NO",
      neveraComment: this.auditInfo$[1]?.comment || "",
      neveraContenido: this.auditInfo$[2]?.answer || "NO",
      neveraContenidoDetalle: this.auditInfo$[2]?.comment || "",
      lugarNevera1: this.auditInfo$[3]?.answer || "",
      neveraCantidad: this.auditInfo$[3]?.comment || "",
      productoNevera1: this.auditInfo$[4]?.answer || "",
      productoNevera1Comment: this.auditInfo$[4]?.comment || "",
      lugarNevera2: this.auditInfo$[5]?.answer || "",
      productoNevera2: this.auditInfo$[5]?.comment || "",
      productoNevera2Comment: this.auditInfo$[5]?.comment || "",
      result: this.auditInfo$[8]?.answer || "KO",
      resultComment: this.auditInfo$[8]?.comment || ""
    };
    const url = `${this.baseUrl}/audits`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Question>(url, dataToSend, { headers });
  }
}
