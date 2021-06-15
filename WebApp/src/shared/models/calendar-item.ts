export class CalendarItem {
    _id: string;
    title: string;
    description: string;
    date: Date;
    enddate: Date;

    constructor(_id: string, title: string, description: string, date: Date, enddate: Date) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.enddate = enddate;
    }
}
