export class CalendarItem {
    _id: string;
    title: string;
    description: string;
    date: Date;
    endDate: Date;

    constructor(_id: string, title: string, description: string, date: Date, endDate: Date) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.endDate = endDate;
    }
}
