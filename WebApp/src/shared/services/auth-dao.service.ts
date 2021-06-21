import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";
import { Dao } from "./dao.service";
import { DataStorageService } from "./data-storage.service";

@Injectable()
export class AuthDao {

    constructor(private dao: Dao, private dataStorageService: DataStorageService) {}

    login(loginEmail: string, loginPassword: string): Observable<User> {
        return this.dao.sendPostRequest('user/login', {
            email: loginEmail,
            password: loginPassword,
        })
        .pipe(map((response: User) => {
          return response;
        }));
    };
}