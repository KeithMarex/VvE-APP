import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Dao } from "./dao.service";

@Injectable()
export class UserDao {

    constructor(private dao: Dao) {}

    // TODO map as User
    getUserById(userId: string): Observable<any> { //TODO Observable<User>
        return this.dao.sendGetRequest('user/' + userId)
        // .pipe(map((response: User) => {
        //   return response;
        // }));
    };
}