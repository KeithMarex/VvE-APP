import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { LoginComponent } from './login/login.component';
import { NewsOverviewComponent } from './news-overview/news-overview.component';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { VveManagementComponent } from './vve-management/vve-management.component';
import { TagsOverviewComponent } from './tags-overview/tags-overview.component';
import { AuthGuard } from '../shared/guards/auth.guard'
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, data: { noAuthRequired: true }, canActivate:[AuthGuard] },
  { path: 'password-recovery', component: PasswordRecoveryComponent, data: { noAuthRequired: true }, canActivate:[AuthGuard] },
  { path: 'account-management', component: AccountManagementComponent, canActivate:[AuthGuard] },
  { path: 'calendar', component: CalendarOverviewComponent, canActivate:[AuthGuard] },
  { path: 'news-overview', component: NewsOverviewComponent, canActivate:[AuthGuard] },
  { path: 'news-editor/:id', component: NewsEditorComponent, canActivate:[AuthGuard] },
  { path: 'ticket-overview', component: TicketOverviewComponent, canActivate:[AuthGuard] },
  { path: 'vve-management', component: VveManagementComponent, canActivate:[AuthGuard] },
  { path: 'tags-overview', component: TagsOverviewComponent, canActivate:[AuthGuard] },
  { path: 'ticket-details/:id', component: TicketDetailsComponent, pathMatch: 'full', canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
