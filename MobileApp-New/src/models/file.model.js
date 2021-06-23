class fileModel{
    constructor(id, filename, type, filesize) {
        this._id = id;
        this._filename = filename;
        this._type = type;
        this._filesize = filesize;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get filename() {
        return this._filename;
    }

    set filename(value) {
        this._filename = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get filesize() {
        return this._filesize;
    }

    set filesize(value) {
        this._filesize = value;
    }
}
export default fileModel;
