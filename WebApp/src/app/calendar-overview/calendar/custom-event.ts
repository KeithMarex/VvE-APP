import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';

/**
 * Overrides angular-calendar's event interfaces to add custom attributes
 */

export interface CustomEvent extends CalendarEvent {
  description: string;
  id: string;
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
