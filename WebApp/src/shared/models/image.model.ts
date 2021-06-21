export class Image {
    _id: string;
    name: string;
    image_url: string;
    delete_url: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(_id: string, name: string, image_url: string, delete_url: string, createdAt: Date, updatedAt: Date) {
        this._id = _id;
        this.name = name;
        this.image_url = image_url;
        this.delete_url = delete_url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}