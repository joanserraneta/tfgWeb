import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) {}

  protected get<T>(endpoint: string) {
    return this.http.get<T>(`${environment.apiUrl}${endpoint}`);
  }

  protected post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${environment.apiUrl}${endpoint}`, body);
  }
}