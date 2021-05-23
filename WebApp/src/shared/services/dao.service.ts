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
      return this.http.get<any>(this.dbAddress + urlPath); //FIXME generate options?
    }

    getAllTickets(): Observable<Ticket[]> {
      // return this.http.get<Ticket[]>("https://vve-api.janvanoverbeek.nl/ticket");
      return this.sendGetRequest('ticket');
    };

    private generateOptions(): { headers: HttpHeaders; withCredentials: boolean } {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return { headers, withCredentials: true };
    }
}
