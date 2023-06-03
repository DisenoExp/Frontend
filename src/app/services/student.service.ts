import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class StudentService {

  baseUrl: string = environment.baseUrl+"/students";

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addStudent(student: any) {
    return this.http.post(this.baseUrl, student);
  }

  updateStudent(id: any, student: any) {
    return this.http.put(`${this.baseUrl}/${id}`, student);
  }

  deleteStudent(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  exportStudent() {
    const endpoint = `${this.baseUrl}/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob',
    }).pipe(catchError((error: HttpErrorResponse) => {
      console.log('Error exporting student data:', error);
      return throwError('Unable to export student data. Please try again later.');
    }));
  }
}