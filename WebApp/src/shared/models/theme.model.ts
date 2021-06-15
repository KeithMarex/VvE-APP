export class Theme {
    _id: string;
    primaryColor: string;
    secondaryColor: string;

    constructor(_id: string, primaryColor: string, secondaryColor: string) {
        this._id = _id;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }
}