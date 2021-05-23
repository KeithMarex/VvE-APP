import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
import { environment } from '../../environments/environment';

@Injectable()
export class Dao {
    dbAddress = environment.API_URL;

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
