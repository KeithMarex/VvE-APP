export class NewsItem {
    _id: string;
    title: string;
    author: string;
    content: string;
    organization: object;
    updatedAt: Date;
    thumbnailUrl: string;

  constructor(_id: string, title: string, content: string,
              author: string, organization: object, updatedAt: Date,
              thumbnail: object) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.organization = organization;
        this.updatedAt = updatedAt;
        this.thumbnailUrl = thumbnail["image_url"];
    }
}
