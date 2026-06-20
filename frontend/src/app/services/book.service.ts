import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = '/api/books';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin123'),
      'Content-Type': 'application/json'
    });
  }

 getAll(): Observable<any> {
  return this.http.get<any>(this.apiUrl, {
    headers: this.getAuthHeaders()
  });
}
  getById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    console.log('BookService.create() called with:', data);
    return this.http.post(this.apiUrl, data, { headers: this.getAuthHeaders() }).pipe(
      tap(data => console.log('BookService.create() response:', data))
    );
  }

  addBook(data: any): Observable<any> {
    return this.create(data);
  }

  update(id: number | string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
