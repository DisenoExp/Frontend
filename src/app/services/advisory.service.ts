import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AdvisoryService {

baseUrl: string = environment.baseUrl+"/advisories";

  constructor(private http: HttpClient) {}

  getAdvisories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getAdvisory(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addAdvisory(advisory: any) {
    return this.http.post(this.baseUrl, advisory);
  }

  updateAdvisory(id: any, advisory: any) {
    return this.http.put(`${this.baseUrl}/${id}`, advisory);
  }

  deleteAdvisory(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  exportAdvisory() {
    const endpoint = `${this.baseUrl}/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob',
    });
  }
}