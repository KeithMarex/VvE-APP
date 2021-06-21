import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Ticket } from "../models/ticket.model";
import { Dao } from "./dao.service";

@Injectable()
export class TicketDao {

    constructor(private dao: Dao) {}

    getAllTickets(): Observable<Ticket[]> {
        return this.dao.sendGetRequest('ticket')
        .pipe(map((response: Ticket[]) => {
          return response;
        }));
    };

    getTicketById(id: string): Observable<Ticket> {
      return this.dao.sendGetRequest('ticket/' + id)
      .pipe(map((response: Ticket) => {
        return response;
      }));
  };

    createTicket(ticketData: FormData): Observable<any> {
      return this.dao.sendPostRequestForm('ticket/', ticketData);
    }

    updateticket(id: string, ticketData: FormData): Observable<any> {
      return this.dao.sendPutRequest('ticket/' + id, ticketData);
    }
}