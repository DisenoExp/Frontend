import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ServiceService {

  baseUrl: string = environment.baseUrl+"/serviceTypes";

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getService(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addService(service: any) {
    return this.http.post(this.baseUrl, service);
  }

  updateService(id: any, service: any) {
    return this.http.put(`${this.baseUrl}/${id}`, service);
  }

  deleteService(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}