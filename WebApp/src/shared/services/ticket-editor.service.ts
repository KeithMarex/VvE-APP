import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class TicketEditorService {
    selectedTicketId = new BehaviorSubject<string>(null);
    ticketCreator = new BehaviorSubject<User>(null);
}