import { User } from "./user.model";
import { Image } from "./image.model";

export class Comment {
    user: User;
    comment: string;
    images: Image[];
    createdAt: Date;

    constructor(user: User, comment: string, images: Image[], createdAt: Date) {
        this.user = user;
        this.comment = comment;
        this.images = images;
        this.createdAt = createdAt;
    }
}
