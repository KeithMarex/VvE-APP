import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NewsOverviewComponent } from './news-overview/news-overview.component';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { VveManagementComponent } from './vve-management/vve-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/ticket-overview', pathMatch: 'full'}, //FIXME redirect to login component as landing page
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'news-overview', component: NewsOverviewComponent },
  { path: 'ticket-overview', component: TicketOverviewComponent },
  { path: 'vve-management', component: VveManagementComponent }

  // TODO add "my-account" route
  // TODO add "login" route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
