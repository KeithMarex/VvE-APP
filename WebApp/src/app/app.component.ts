import { Component } from '@angular/core';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'WebApp';

  constructor(private dataStorageService: DataStorageService) { }


  UserIsLoggedIn(): boolean {
    return !this.dataStorageService.getLoggedInUserId();
  }
}
