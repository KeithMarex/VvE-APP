export class NewsItem {
    _id: string;
    title: string;
    author: string;
    content: string;
    organization: object;
    updatedAt: Date;

  constructor(_id: string, title: string, content: string, author: string, organization: object, updatedAt: Date) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.organization = organization;
        this.updatedAt = updatedAt;
    }
}
