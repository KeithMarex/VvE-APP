import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OrganizationFile } from "../models/organization-file.model";
import { Organization } from "../models/organization.model";
import { Theme } from "../models/theme.model";
import { Dao } from "./dao.service";

@Injectable()
export class OrganizationDao {

    constructor(private dao: Dao) {}

    getOrganization(): Observable<Organization> {
        return this.dao.sendGetRequest('organization')
        .pipe(map((response: Organization) => {
            return response;
        }));
    }

    getTheme(): Observable<Theme> {
        return this.dao.sendGetRequest('organization/theme')
        .pipe(map((response: {Theme: Theme, id: string}) => {
            return response.Theme;
        }));
    }

    getFiles(): Observable<OrganizationFile[]> {
        return this.dao.sendGetRequest('organization/file')
        .pipe(map((response: OrganizationFile[]) => {
            return response;
        }));
    }

    updateTheme(theme: Theme): Observable<any> {
        var body = 
        {
            "primarycolor": theme.primarycolor,
            "secondarycolor": theme.secondarycolor
        }
        
        return this.dao.sendPutRequest('organization/theme', body);
    }

    updateDetails(OrganizationData: FormData): Observable<any> {
        return this.dao.sendPutRequestForm('organization', OrganizationData);
    }
}