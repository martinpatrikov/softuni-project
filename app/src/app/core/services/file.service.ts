import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<any>{
    return this.http.get<any>('/api/data/catalog');
  }
  getFileByID(id: string): Observable<any>{
    return this.http.get<any>(`/api/data/catalog/${id}`);
  }
  uploadFile(file: any): Observable<any>{
    return this.http.post<any>('/api/data/catalog', file);
  }
}
