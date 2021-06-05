import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent} from 'angular-calendar';

export interface CustomEvent extends CalendarEvent {
  description: string;
}

export interface CustomEventAction extends CalendarEventAction {
  onClick({ event, sourceEvent, }: {
    event: CustomEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }): any;
}

export interface CustomEventTimesChangedEvent extends CalendarEventTimesChangedEvent {
  event: CustomEvent;
}
