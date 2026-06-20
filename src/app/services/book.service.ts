import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  // GET operations are open — no auth required
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Basic Auth is injected automatically by authInterceptor for POST/PUT/DELETE
  create(book: any): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  update(id: number, book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, book);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  search(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?search=${keyword}`);
  }
}
