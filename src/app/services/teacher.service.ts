import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class TeacherService {

  baseUrl: string = environment.baseUrl+"/teachers";

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getTeacher(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addTeacher(teacher: any) {
    return this.http.post(this.baseUrl, teacher);
  }

  updateTeacher(id: any, teacher: any) {
    return this.http.put(`${this.baseUrl}/${id}`, teacher);
  }

  deleteTeacher(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  exportTeacher() {
    const endpoint = `${this.baseUrl}/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob',
    });
  }
}