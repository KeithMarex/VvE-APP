import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Injectable } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxEditorModule } from 'ngx-editor';
import {
  CalendarModule,
  CalendarDateFormatter,
  DateAdapter, CalendarNativeDateFormatter, DateFormatterParams
} from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeNl from '@angular/common/locales/nl';
registerLocaleData(localeNl);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NewsOverviewComponent } from './news-overview/news-overview.component';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { VveManagementComponent } from './vve-management/vve-management.component';
import { LoginComponent } from './login/login.component';
import { TicketListComponent } from './ticket-overview/ticket-list/ticket-list.component';
import { TicketItemComponent } from './ticket-overview/ticket-list/ticket-item/ticket-item.component';
import { PopupComponent } from './popup/popup.component';
import { TicketDao } from 'src/shared/services/ticket-dao.service';
import { TagDao } from 'src/shared/services/tag-dao.service';
import { AuthDao } from 'src/shared/services/auth-dao.service';
import { CommentDao } from 'src/shared/services/comment-dao.service';
import { CalendarDao } from 'src/shared/services/calendar-dao.service';
import { TagsOverviewComponent } from './tags-overview/tags-overview.component';
import { TagListComponent } from './tags-overview/tag-list/tag-list.component';
import { TagItemComponent } from './tags-overview/tag-list/tag-item/tag-item.component';
import { TagCreatorComponent } from './tags-overview/tag-creator/tag-creator.component';
import { TagEditorComponent } from './tags-overview/tag-editor/tag-editor.component';
import { Dao } from 'src/shared/services/dao.service';
import { TicketCreatorComponent } from './ticket-overview/ticket-creator/ticket-creator.component';
import { UserDao } from 'src/shared/services/user-dao.service';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketCommentComponent } from './ticket-details/ticket-comment/ticket-comment.component';
import { LoggedInUserTicketCommentComponent } from './ticket-details/logged-in-user-ticket-comment/logged-in-user-ticket-comment.component';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { AccountListComponent } from './account-management/account-list/account-list.component';
import { AccountItemComponent } from './account-management/account-list/account-item/account-item.component';
import { DropdownComponent } from 'src/shared/dropdown/dropdown.component';
import { DropdownSelectedDirective } from 'src/shared/dropdown/dropdown-selected.directive';
import { DropdownOptionDirective } from 'src/shared/dropdown/dropdown-option.directive';
import { AccountCreatorComponent } from './account-management/account-creator/account-creator.component';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { CalendarComponent } from './calendar-overview/calendar/calendar.component';
import { CalendarItemCreatorComponent } from './calendar-overview/calendar-item-creator/calendar-item-creator.component';
import { CalendarService } from './calendar-overview/calendar/calendar.service';
import { CalendarItemDetailsComponent } from './calendar-overview/calendar/calendar-item-details/calendar-item-details.component';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { SpinnerComponent } from 'src/shared/spinner/spinner.component';
import { OrganizationDao } from 'src/shared/services/organization-dao.service';
import { JsonParserService } from 'src/shared/services/json-parser.service';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';
import { NewsDao } from '../shared/services/news-dao.service';
import { NewsItemListComponent } from './news-overview/news-item-list/news-item-list.component';
import { NewsItemComponent } from './news-overview/news-item-list/news-item/news-item.component';

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TicketOverviewComponent,
    NavigationBarComponent,
    NewsOverviewComponent,
    NewsEditorComponent,
    CalendarOverviewComponent,
    AccountManagementComponent,
    VveManagementComponent,
    LoginComponent,
    TicketListComponent,
    TicketItemComponent,
    TicketCreatorComponent,
    PopupComponent,
    TagsOverviewComponent,
    TagListComponent,
    TagItemComponent,
    TagCreatorComponent,
    TagEditorComponent,
    TicketDetailsComponent,
    TicketCommentComponent,
    LoggedInUserTicketCommentComponent,
    AccountListComponent,
    AccountItemComponent,
    DropdownComponent,
    DropdownSelectedDirective,
    DropdownOptionDirective,
    AccountCreatorComponent,
    CalendarComponent,
    CalendarItemCreatorComponent,
    CalendarItemDetailsComponent,
    SpinnerComponent,
    PasswordRecoveryComponent,
    ConfirmationPopupComponent,
    SearchBarComponent,
    NewsItemListComponent,
    NewsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    }),
    NgxDaterangepickerMd.forRoot(),
    NgxEditorModule
  ],
  providers: [
    Dao,
    TicketDao,
    TagDao,
    AuthDao,
    UserDao,
    CommentDao,
    CalendarDao,
    TicketEditorService,
    DataStorageService,
    CalendarService,
    OrganizationDao,
    JsonParserService,
    NewsDao,
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
