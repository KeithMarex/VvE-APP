class TicketModel{

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get images() {
        return this._images;
    }

    set images(value) {
        this._images = value;
    }

    get creator() {
        return this._creator;
    }

    set creator(value) {
        this._creator = value;
    }

    constructor(title, description, images, creator) {
        this._title = title;
        this._description = description;
        this._images = images;
        this._creator = creator;
    }
}
export default TicketModel;
