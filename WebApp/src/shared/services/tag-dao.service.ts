import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Tag } from "../models/tag.model";
import { Dao } from "./dao.service";

@Injectable()
export class TagDao {

    constructor(private dao: Dao) {}

    getAllTags(): Observable<Tag[]> {
        return this.dao.sendGetRequest('tag')
        .pipe(map((response: Tag[]) => {
          return response;
        }));
    };
}