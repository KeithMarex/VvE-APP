import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";
import { Dao } from "./dao.service";

@Injectable()
export class UserDao {

    constructor(private dao: Dao) {}

    getUserById(userId: string): Observable<User> {
        return this.dao.sendGetRequest('user/' + userId)
        .pipe(map((response: User) => {
          return response;
        }));
    };
}