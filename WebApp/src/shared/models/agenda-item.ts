export class AgendaItem {
    _id: string;
    title: string;
    description: string;
    organisation: string;
    date: Date;
    endDate: Date;

    constructor(_id: string, title: string, description: string, date: Date, endDate: Date, organisation: string) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.endDate = endDate;
        this.organisation = organisation;
    }
}
