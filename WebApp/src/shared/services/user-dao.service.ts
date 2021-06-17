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

    getUsersByOrganization(): Observable<User[]> {
      return this.dao.sendGetRequest('user')
      .pipe(map((response: User[]) => {
        return response;
      }))
    }

    getAdminsByOrganization(): Observable<User[]> {
      return this.dao.sendGetRequest('organization/users')
      .pipe(map((response: User[]) => {
        return response;
      }))
    }

    registerUser(email: string, firstname: string, lastname: string): Observable<any> {
      const body = 
      [{
        "email": email,
        "firstname": firstname,
        "lastname": lastname
      }];

      return this.dao.sendPostRequest('user/register', body);
    }

    recoverPassword(email: string): Observable<any> {
      const body = 
      [{
        "email": email
      }];

      return this.dao.sendPostRequest('user/reset', body);
    }
}