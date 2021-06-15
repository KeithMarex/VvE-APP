import { Injectable, OnInit } from "@angular/core";
import { Theme } from "../models/theme.model";
import { JsonParserService } from "./json-parser.service";
import { ThemeDao } from "./theme-dao.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private theme: Theme = this.getTheme() || new Theme('#451864', '#A0CAE8'); // Default theme in case access token is unavailable
    private primaryColor: string = this.theme.primarycolor;
    private secondaryColor: string = this.theme.secondarycolor;
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

    getTheme(): Theme {
        // Attempt to fetch theme from session storage to prevent unnecessary requests
        var theme = this.getThemeFromStorage();
        var loggedIn = this.getValueFromStorage('userId') != null;

        if (!theme && loggedIn) {
            this.getThemeFromDao();
        }

        return theme;
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

            location.reload();
        }, 
        () => {
            return;
        });
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        sessionStorage.setItem('Theme', JSON.stringify(this.theme));
        this.setColors();
    }

    setColors() {
        this.primaryColor = this.theme.primarycolor;
        this.secondaryColor = this.theme.secondarycolor;
    }

}