import { Comment } from "./comment.model";
import { Image } from "./image.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export class Ticket {
    _id?: string;
    title?: string;
    description?: string;
    images?: Image[];
    creator?: User;
    assignee?: User;
    status?: string;
    comments?: Comment[];
    tag?: Tag;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(_id: string, title: string, description: string, images: Image[], creator: User, assignee: User, status: string, comments: Comment[], tag: Tag, createdAt: Date, updatedAt: Date) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.images = images;
        this.creator = creator;
        this.assignee = assignee;
        this.status = status;
        this.comments = comments;
        this.tag = tag;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}