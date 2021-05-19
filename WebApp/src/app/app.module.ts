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

@NgModule({
  declarations: [
    AppComponent,
    TicketOverviewComponent,
    NavigationBarComponent,
    NewsOverviewComponent,
    CalendarComponent,
    AccountManagementComponent,
    VveManagementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
