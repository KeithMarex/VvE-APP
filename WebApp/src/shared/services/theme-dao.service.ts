import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Theme } from "../models/theme.model";
import { Dao } from "./dao.service";

@Injectable()
export class ThemeDao {

    constructor(private dao: Dao) {}

    getTheme(): Observable<Theme> {
        return this.dao.sendGetRequest('organization/theme')
        .pipe(map((response: Theme) => {
            return response;
        }));
    };

    updateTheme(theme: any): Observable<any> {
        return this.dao.sendPutRequest('organization/theme', theme);
    }
}