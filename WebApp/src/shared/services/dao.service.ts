import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';

@Injectable()
export class Dao {
    dbAddress = 'https://vve-api.janvanoverbeek.nl/';

    constructor(private http: HttpClient) {}

    sendGetRequest(urlPath: string) : Observable<any> {
      return this.http.get<any>(this.dbAddress + urlPath, this.generateOptions());
    }

    getAllTickets(): Observable<Ticket[]> {
      return this.sendGetRequest('ticket')
      .pipe(map((response: Ticket[]) => {
        return response;
      }));
    };

    private generateOptions(): { headers: HttpHeaders } {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return { headers };
    }
}
