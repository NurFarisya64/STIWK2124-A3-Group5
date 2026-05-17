import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  // Helper method to generate Basic Auth Headers
  private getAuthHeaders(): HttpHeaders {
    // Replace 'admin' and 'password123' with your actual Spring Security credentials
    const username = 'admin'; 
    const password = 'password123';
    
    // btoa encodes the string to Base64 as required by Basic Auth protocol
    const credential = btoa(`${username}:${password}`);
    
    return new HttpHeaders({
      'Authorization': `Basic ${credential}`
    });
  }

  // GET operations remain open (No headers passed)
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Write operations securely pass the Basic Auth headers
  create(book: any): Observable<any> {
    return this.http.post(this.baseUrl, book, { headers: this.getAuthHeaders() });
  }

  update(id: number, book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, book, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  search(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?search=${keyword}`);
  }
}