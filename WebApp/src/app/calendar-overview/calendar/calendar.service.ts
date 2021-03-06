import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { addMonths, isSameMinute, isSameMonth, subMonths } from 'date-fns';
import { CalendarItem } from '../../../shared/models/calendar-item';
import { CustomEvent } from './custom-event';
import { CalendarDao } from '../../../shared/services/calendar-dao.service';

interface StoredMonth {
  month: Date;
  calendarItems: CalendarItem[];
}

@Injectable()
export class CalendarService {
  calendarItems = new BehaviorSubject<CalendarItem[]>([]);
  storedMonths: StoredMonth[] = [];

  constructor(private calendarDao: CalendarDao) { }

  customEventToCalendarItem(event: CustomEvent): CalendarItem {
    return new CalendarItem(
      event.id,
      event.title,
      event.description,
      event.start,
      event.end
    );
  }

  updateCalendarItem(calendarItem: CalendarItem): void {
    const calendarItems = this.calendarItems.getValue();
    const updatedCalendarItemIndex = calendarItems.findIndex(
      (item) => item._id === calendarItem._id
    );
    calendarItems[updatedCalendarItemIndex] = calendarItem;

    this.calendarItems.next(calendarItems);
  }

  deleteCalendarItem(calendarItemId: string): void {
    this.calendarItems.next(
      this.calendarItems.getValue().filter((calendarItem) => {
          return calendarItem._id !== calendarItemId;
        }
      ));
  }

  setCalendarItems(calendarItems: CalendarItem[]): void {
    this.calendarItems.next(calendarItems);
  }

  addCalendarItem(calendarItem: CalendarItem): void {
    this.calendarItems.next(
      this.calendarItems.getValue().concat([calendarItem])
    );
  }

  fetchMonthAndSurroundingMonthsItems(date: Date): void {
    let calendarItemsWithSurroundingMonths = [];

    this.findOrFetchMonthItems(date)
      .then((thisMonthItems) => {
        calendarItemsWithSurroundingMonths =
          calendarItemsWithSurroundingMonths.concat(thisMonthItems);

        this.findOrFetchMonthItems(subMonths(date, 1))
          .then((prevMonthItems) => {
            calendarItemsWithSurroundingMonths =
              calendarItemsWithSurroundingMonths.concat(prevMonthItems);

            this.findOrFetchMonthItems(addMonths(date, 1))
              .then((nextMonthItems) => {
                calendarItemsWithSurroundingMonths =
                  calendarItemsWithSurroundingMonths.concat(nextMonthItems);

                this.setCalendarItems(calendarItemsWithSurroundingMonths);
              });
          });
    });
  }

  overwriteWithNewMonthItems(newDate: Date, oldDate: Date): boolean {
    let didOverwriteMonthItems = false;

    if (!this.calendarItemsIsEmpty()) {
      this.storeMonth(oldDate);
    }

    const foundCalendarItemsThisMonth = this.findStoredCalendarItems(newDate);
    if (foundCalendarItemsThisMonth) {
      const foundCalendarItems = foundCalendarItemsThisMonth ? foundCalendarItemsThisMonth : [];
      const foundSurroundingCalendarItems = this.findSurroundingStoredCalendarItems(newDate);
      foundCalendarItems.push(...foundSurroundingCalendarItems);
      this.setCalendarItems(foundCalendarItems);
      didOverwriteMonthItems = true;
    }

    return didOverwriteMonthItems;
  }

  storeMonth(month: Date): void {
    if (!this.monthIsStored(month)) {
      this.storedMonths.push({
        month,
        calendarItems: this.calendarItems.getValue().filter(calendarItem =>
          isSameMonth(new Date(calendarItem.date), month)
        )
      });
    }
  }

  monthIsStored(month: Date): boolean {
    this.storedMonths.forEach((storedMonth) => {
      if (isSameMonth(storedMonth.month, month)) {
        return true;
      }
    });
    return false;
  }

  findOrFetchMonthItems(month: Date): Promise<CalendarItem[]> {
    return new Promise<CalendarItem[]>((resolve) => {
      const storedItemsMonth = this.findStoredCalendarItems(month);
      if (!storedItemsMonth) {
        this.calendarDao.getCalendarItems(this.getFetchMonthString(month))
          .subscribe((monthCalItems) => {
            resolve(monthCalItems);
          });
      } else {
        resolve(storedItemsMonth);
      }
    });
  }

  findSurroundingStoredCalendarItems(month: Date): CalendarItem[] {
    const surroundingCalendarItems = [];
    const nextMonthItems = this.findStoredCalendarItems(addMonths(month, 1));
    const prevMonthItems = this.findStoredCalendarItems(subMonths(month, 1));
    surroundingCalendarItems.push(...nextMonthItems ? nextMonthItems : []);
    surroundingCalendarItems.push(...prevMonthItems ? prevMonthItems : []);

    return surroundingCalendarItems;
  }

  findStoredCalendarItems(month: Date): CalendarItem[] {
    let foundItems = null;
    this.storedMonths.forEach((storedMonth) => {
      if (isSameMonth(storedMonth.month, month)) {
        foundItems = storedMonth.calendarItems;
      }
    });
    return foundItems;
  }

  parseCalendarItemsToDisplayable(calItems: CalendarItem[], actions): CustomEvent[] {
    const parsedEvents: CustomEvent[] = [];

    calItems.forEach((calItem) => {
      parsedEvents.push(
        this.calendarItemToCustomEvent(calItem, actions)
      );
    });

    return parsedEvents;
  }

  calendarItemToCustomEvent(calItem: CalendarItem, actions): CustomEvent {
    const startDate = new Date(calItem.date);
    const endDate = calItem.enddate ? new Date(calItem.enddate) : undefined;
    const allDay = isSameMinute(startDate, endDate);

    const customEvent: CustomEvent[] = [];
    customEvent.push({
      start: startDate,
      end: endDate,
      title: calItem.title,
      description: calItem.description,
      id: calItem._id,
      allDay,
      actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    });

    return customEvent[0];
  }

  getFetchMonthString(month: Date): string {
    return (month.getFullYear()) + '-' + (month.getMonth() + 1);
  }

  calendarItemsIsEmpty(): boolean {
    return this.calendarItems.getValue().length <= 0;
  }
}
