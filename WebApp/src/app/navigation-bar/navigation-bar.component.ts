import { Component, OnInit, Input } from '@angular/core';
import { TicketDao } from 'src/shared/services/ticket-dao.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Input() ticketCount = 0;


  constructor(private ticketDao: TicketDao) { }

  ngOnInit(): void {
    this.ticketDao.getAllTickets()
    .subscribe(res => {
      this.ticketCount = res.length;
    })
  }

}
