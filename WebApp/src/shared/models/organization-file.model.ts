export class OrganizationFile {
    _id: string;
    filename: string;
    type: string;
    organization: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(_id: string, filename: string, organization: string, createdAt: Date, updatedAt: Date) {
        this._id = _id;
        this.filename = filename
        this.organization = organization
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
