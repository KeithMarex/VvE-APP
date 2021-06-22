class NewsModel {
    constructor(id, author, title, content, createdAt, updatedAt) {
        this._id = id;
        this._author = author;
        this._title = title;
        this._content = content;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(value) {
        this._updatedAt = value;
    }
}
export default NewsModel;
