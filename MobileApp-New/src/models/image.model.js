class imageModel{
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    constructor(name, image) {
        this._name = name;
        this._image = image;
    }
}
export default imageModel;
