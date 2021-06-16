import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme } from "../models/theme.model";
import { JsonParserService } from "./json-parser.service";
import { ThemeDao } from "./theme-dao.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    primaryColor = new BehaviorSubject<string>('#000000');
    secondaryColor = new BehaviorSubject<string>('#000000');
    private loggedInUserId: string = this.getValueFromStorage('userId');

    constructor(private themeDao: ThemeDao) {}

    getValueFromStorage(key: string): string {
        var storageValue =  localStorage.getItem(key);

        return storageValue || null;
    }

    getValueFromSessionStorage(key: string): string {
        var storageValue = sessionStorage.getItem(key);

        return storageValue || null;
    }

    getLoggedInUserId(): string {
        return this.loggedInUserId;
    }

    setLoggedInUserId(user: string): void {
        this.loggedInUserId = user;
        localStorage.setItem('userId', user);
        
        this.getTheme();
    }

    getTheme() {
        var loggedIn = this.getValueFromStorage('userId') != null;

        if (loggedIn) {
            this.getThemeFromDao();
        }
    }

    getThemeFromDao() {
        this.themeDao.getTheme()
        .subscribe(res => {
            this.setTheme(res);
        });
    }

    setTheme(theme: Theme) {
        document.documentElement.style.setProperty('--dynamic-primary', theme.primarycolor);
        document.documentElement.style.setProperty('--dynamic-secondary', theme.secondarycolor);

        this.primaryColor.next(theme.primarycolor);
        this.secondaryColor.next(theme.secondarycolor);
    }

}