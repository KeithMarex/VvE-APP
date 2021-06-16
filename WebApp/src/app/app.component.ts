import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'WebApp';

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit()
  {
    this.dataStorageService.getTheme();
    document.documentElement.style.setProperty('--dynamic-primary', this.dataStorageService.getPrimaryColor());
    document.documentElement.style.setProperty('--dynamic-secondary', this.dataStorageService.getSecondaryColor());
  }


  UserIsLoggedIn(): boolean {
    return !this.dataStorageService.getLoggedInUserId();
  }
}
