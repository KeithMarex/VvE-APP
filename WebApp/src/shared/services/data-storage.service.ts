import { Injectable, OnInit } from "@angular/core";
import { Theme } from "../models/theme.model";
import { JsonParserService } from "./json-parser.service";
import { ThemeDao } from "./theme-dao.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private primaryColor: string = '#000000';
    private secondaryColor: string = '#000000';
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

    getPrimaryColor(): string {
        return this.primaryColor;
    }

    getSecondaryColor(): string {
        return this.secondaryColor;
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

    getThemeFromStorage(): Theme {
        var storedJsonTheme = this.getValueFromSessionStorage('Theme');
        var storedTheme;

        if (storedJsonTheme) {
            storedTheme = JsonParserService.toObjectInstance(new Theme('#000000', '#000000'), storedJsonTheme);
        }

        return storedTheme;
    }

    getThemeFromDao() {
        this.themeDao.getTheme()
        .subscribe(res => {
            this.setTheme(res);
        }, 
        () => {
            return;
        });
    }

    setTheme(theme: Theme) {
        document.documentElement.style.setProperty('--dynamic-primary', theme.primarycolor);
        document.documentElement.style.setProperty('--dynamic-secondary', theme.secondarycolor);

        this.primaryColor = theme.primarycolor;
        this.secondaryColor = theme.secondarycolor;
    }

}