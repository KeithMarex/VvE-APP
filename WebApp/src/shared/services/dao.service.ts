import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Dao {
    dbAddress = 'https://vve-api.janvanoverbeek.nl/';

    constructor(private http: HttpClient) {}

    sendGetRequest(path: string): Observable<any> {
        return this.http.get<any>(this.dbAddress + path, this.generateOptions());
    }

    private generateOptions(): { headers: HttpHeaders; } {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return { headers };
      }
}
