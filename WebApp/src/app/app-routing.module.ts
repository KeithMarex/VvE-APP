import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { LoginComponent } from './login/login.component';
import { NewsOverviewComponent } from './news-overview/news-overview.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { VveManagementComponent } from './vve-management/vve-management.component';
import { TagsOverviewComponent } from './tags-overview/tags-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'calendar', component: CalendarOverviewComponent },
  { path: 'news-overview', component: NewsOverviewComponent },
  { path: 'news-create', component: NewsCreateComponent },
  { path: 'ticket-overview', component: TicketOverviewComponent },
  { path: 'vve-management', component: VveManagementComponent },
  { path: 'tags-overview', component: TagsOverviewComponent },
  { path: 'ticket-details/:id', component: TicketDetailsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
