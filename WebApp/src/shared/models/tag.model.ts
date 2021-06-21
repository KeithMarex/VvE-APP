export class Tag {
    _id?: string;
    name: string;
    color?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(_id: string, name: string, color: string, createdAt: Date, updatedAt: Date) {
        this._id = _id;
        this.name = name;
        this.color = color;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}