class UserModel {
    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get organizations() {
        return this._organizations;
    }

    set organizations(value) {
        this._organizations = value;
    }

    get parking() {
        return this._parking;
    }

    set parking(value) {
        this._parking = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get firstname() {
        return this._firstname;
    }

    set firstname(value) {
        this._firstname = value;
    }

    get lastname() {
        return this._lastname;
    }

    set lastname(value) {
        this._lastname = value;
    }

    constructor(role, organizations, parking, id, email, firstname, lastname) {
        this._role = role;
        this._organizations = organizations;
        this._parking = parking;
        this._id = id;
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
    }
}
export default UserModel;
