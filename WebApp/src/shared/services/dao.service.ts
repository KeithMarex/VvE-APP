import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class Dao {
    dbAddress = environment.API_URL;

    constructor(private http: HttpClient) {}

    sendGetRequest(urlPath: string): Observable<any> {
      return this.http.get<any>(this.dbAddress + urlPath, this.generateOptions());
    }

    sendPostRequest(urlPath: string, body: unknown): Observable<any> {
      return this.http.post<any>(this.dbAddress + urlPath, body, this.generateOptions());
    }

    sendPostRequestForm(urlPath: string, body: unknown): Observable<any> { // TODO rewrite
      return this.http.post<any>(this.dbAddress + urlPath, body, { withCredentials: true });
    }

    sendPutRequest(urlPath: string, body: unknown): Observable<any> {
      return this.http.put<any>(this.dbAddress + urlPath, body, this.generateOptions());
    }

    sendDeleteRequest(urlPath: string): Observable<any> {
      return this.http.delete<any>(this.dbAddress + urlPath, this.generateOptions());
    }

    private generateOptions(): { headers: HttpHeaders, withCredentials: boolean } {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return { headers, withCredentials: true };
    }
}
