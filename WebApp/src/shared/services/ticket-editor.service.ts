import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ticket } from "../models/ticket.model";

@Injectable()
export class TicketEditorService {
    selectedTicketId = new BehaviorSubject<string>(null);
    ticketCreator = new BehaviorSubject<string>(null);
}