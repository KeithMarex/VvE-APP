import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/shared/models/ticket.model';
import { User } from 'src/shared/models/user.model';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;

  constructor(private userDao: UserDao, private router: Router, private ticketEditorService: TicketEditorService) { }

  ngOnInit(): void {}

  onEdit() {
    this.ticketEditorService.selectedTicketId.next(this.ticket._id);
    this.router.navigate(['ticket-details/' + this.ticket._id]);
  }
}
