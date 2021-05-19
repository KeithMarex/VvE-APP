export class Ticket {
    id: string;
    title: string;
    description: string;
    //TODO images
    creator: string;
    assignee: string;
    status: string;
    //TODO comments
    //TODO tags
    createdAt: Date;
    updatedAt: Date;

    //TODO add images, comments and tags
    constructor(id: string, title: string, description: string, creator: string, assignee: string, status: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creator = creator;
        this.assignee = assignee;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}