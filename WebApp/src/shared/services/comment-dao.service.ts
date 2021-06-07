import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Image } from "../models/image.model";
import { Comment } from "../models/comment.model";
import { Dao } from "./dao.service";

@Injectable()
export class CommentDao {

    constructor(private dao: Dao) {}

    createTicket(commentData): Observable<any> {
      return this.dao.sendPostRequestForm('comment/', commentData);
    }
}