import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthDao } from 'src/shared/services/auth-dao.service';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { TicketDao } from 'src/shared/services/ticket-dao.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Input() ticketCount = 0;

  constructor(private ticketDao: TicketDao, private authDao: AuthDao, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.ticketDao.getAllTickets()
    .subscribe(res => {
      this.ticketCount = res.length;
    });
  }

  onLogout() {
    this.authDao.logout().subscribe();
    this.dataStorageService.clearStoredData();

    location.reload();
  }

}
