import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NewsOverviewComponent } from './news-overview/news-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { VveManagementComponent } from './vve-management/vve-management.component';
import { LoginComponent } from './login/login.component';
import { TicketListComponent } from './ticket-overview/ticket-list/ticket-list.component';
import { TicketItemComponent } from './ticket-overview/ticket-list/ticket-item/ticket-item.component';
import { PopupComponent } from './popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketDao } from 'src/shared/services/ticket-dao.service';
import { AuthDao } from 'src/shared/services/auth-dao.service';
import { FormsModule } from '@angular/forms';
import { Dao } from 'src/shared/services/dao.service';
import { TicketCreatorComponent } from './ticket-overview/ticket-creator/ticket-creator.component';
import { UserDao } from 'src/shared/services/user-dao.service';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';

@NgModule({
  declarations: [
    AppComponent,
    TicketOverviewComponent,
    NavigationBarComponent,
    NewsOverviewComponent,
    CalendarComponent,
    AccountManagementComponent,
    VveManagementComponent,
    LoginComponent,
    TicketListComponent,
    TicketItemComponent,
    TicketCreatorComponent,
    PopupComponent,
    TicketDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Dao,
    TicketDao,
    AuthDao,
    UserDao,
    TicketEditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
