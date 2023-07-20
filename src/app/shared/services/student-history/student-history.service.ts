import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentHistoryService {
  BASE_URL = 'http://localhost:8080/lms';
  constructor(private http: HttpClient) {}

  getStudentHistory = (id: number): Observable<any> => {
    return this.http.get<any>(`${this.BASE_URL}/shs/${id}`);
  };

  getStudentHistorySubjects = (id: number): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/shs/${id}`);
  };
}
