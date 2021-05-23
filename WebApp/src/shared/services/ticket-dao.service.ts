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

}