import { Image } from "./image.model";
import { Theme } from "./theme.model";

export class Organization {
    Theme: Theme;
    _id: string;
    name: string;
    updatedAt: Date;
    logo: Image;

    constructor(Theme: Theme, _id: string, name: string, updatedAt: Date, logo: Image) {
        this.Theme = Theme;
        this._id = _id;
        this.name = name;
        this.updatedAt = updatedAt;
        this.logo = logo;
    }
}
