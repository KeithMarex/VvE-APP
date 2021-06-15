import { Injectable } from "@angular/core";

@Injectable()
export class JsonParserService {

    static toObjectInstance<T>(object: T, json: string): T {
        var jsonObject = JSON.parse(json);

        if (typeof object["fromJSON"] === "function") {
            object["fromJSON"](jsonObject);
        }
        else {
            for (var property in jsonObject) {
                object[property] = jsonObject[property];
            }
        }

        return object;
    }
}