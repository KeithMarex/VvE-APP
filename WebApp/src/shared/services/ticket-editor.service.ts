import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ticket } from "../models/ticket.model";
import { User } from "../models/user.model";

@Injectable()
export class TicketEditorService {
    selectedTicket = new BehaviorSubject<Ticket>(null);
    ticketCreator = new BehaviorSubject<User>(null);
}