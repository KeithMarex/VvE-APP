export class User {
    _id?: string;
    email?: string;
    role?: string;
    firstname?: string;
    lastname?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(_id: string, email: string, role: string, firstname: string, lastname: string, createdAt: Date, updatedAt: Date) {
        this._id = _id;
        this.email = email;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
