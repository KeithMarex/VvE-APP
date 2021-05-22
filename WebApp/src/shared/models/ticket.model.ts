import { Comment } from "./comment.model";
import { Image } from "./image.model";
import { Tag } from "./tag.model";

export class Ticket {
    _id: string;
    title: string;
    description: string;
    images: Image[];
    creator: string;
    assignee: string;
    status: string;
    comments: Comment[];
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;

    constructor(_id: string, title: string, description: string, images: Image[], creator: string, assignee: string, status: string, comments: Comment[], tags: Tag[], createdAt: Date, updatedAt: Date) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.images = images;
        this.creator = creator;
        this.assignee = assignee;
        this.status = status;
        this.comments = comments;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}