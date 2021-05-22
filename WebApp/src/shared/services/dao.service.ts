import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Dao {
    dbAddress = 'https://vve-api.janvanoverbeek.nl/';

    constructor(private http: HttpClient) {}

    sendGetRequest(urlPath: string) : Observable<any> {
      return this.http
      .get<any>(this.dbAddress + urlPath, this.generateOptions());
    }

    getAllTickets(): Observable<any[]> {
      return this.sendGetRequest('ticket')
      .pipe(map(responseData => {
        console.log('Request sent');
        return responseData.result;
      }))
    }

    private generateOptions(): { headers: HttpHeaders; withCredentials: boolean } {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return { headers, withCredentials: true };
    }
}
