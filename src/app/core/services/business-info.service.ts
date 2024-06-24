import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessInfoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/businessInfo/search`);
  }

  getLocalities(province: string): Observable<any> {
    const params = new HttpParams().set('province', province);
    return this.http.get(`${this.baseUrl}/businessInfo/search`, { params });
  }

  getDistributors(province: string, locality: string): Observable<any> {
    const params = new HttpParams()
      .set('province', province)
      .set('locality', locality);
    return this.http.get(`${this.baseUrl}/businessInfo/search`, { params });
  }

  getEstablishments(province: string, locality: string, distributor: string, address: string): Observable<any> {
    const params = new HttpParams()
      .set('province', province)
      .set('locality', locality)
      .set('distributor', distributor)
      .set('address', address);
    return this.http.get(`${this.baseUrl}/businessInfo/search`, { params });
  }

  getAddresses(province: string, locality: string, distributor: string ): Observable<any> {
    const params = new HttpParams()
      .set('province', province)
      .set('locality', locality)
      .set('distributor', distributor)
    return this.http.get(`${this.baseUrl}/businessInfo/search`, { params });
  }

  getResults(province: string, locality: string, distributor: string, establishment: string, address: string): Observable<any> {
    const params = new HttpParams()
      .set('province', province)
      .set('locality', locality)
      .set('distributor', distributor)
      .set('establishment', establishment)
      .set('address', address);
    return this.http.get(`${this.baseUrl}/businessInfo/search`, { params });
  }

  getBusinessInfoById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/businessInfo/${id}`);
  }
}
