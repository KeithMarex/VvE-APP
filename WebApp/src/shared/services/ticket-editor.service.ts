import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ticket } from "../models/ticket.model";

@Injectable()
export class TicketEditorService {
    selectedTicket = new Subject<Ticket>();
}