import { Injectable } from "@angular/core";
import { Theme } from "../models/theme.model";
import { JsonParserService } from "./json-parser.service";
import { ThemeDao } from "./theme-dao.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private theme: Theme = this.getTheme();
    private primaryColor: string = this.theme ? this.theme.primarycolor : '#451864'; // Default color value
    private secondaryColor: string = this.theme? this.theme.secondarycolor : '#A0CAE8'; // Default color value
    private loggedInUserId: string = this.getValueFromStorage('userId');

    constructor(private themeDao: ThemeDao) {}

    getValueFromStorage(key: string): string {
        var storageValue =  localStorage.getItem(key);

        return storageValue ? storageValue : null;
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
    }

    getTheme(): Theme {
        var theme = this.getThemeFromStorage();

        if (!theme) {
            theme = this.getThemeFromDao();
        }

        return theme;
    }

    getThemeFromStorage(): Theme {
        var storedJsonTheme = this.getValueFromStorage('Theme');
        var storedTheme;

        if (storedJsonTheme) {
            storedTheme = JsonParserService.toObjectInstance(new Theme('#000000', '#000000'), storedJsonTheme);
        }

        return storedTheme;
    }

    getThemeFromDao(): Theme {
        var theme;

        this.themeDao.getTheme()
        .subscribe(res => {
            theme = res;
        }, 
        () => {
            return;
        });

        return theme;
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        localStorage.setItem('Theme', JSON.stringify(this.theme));
        this.setColors();
    }

    setColors() {
        this.primaryColor = this.theme.primarycolor;
        this.secondaryColor = this.theme.secondarycolor;
    }
}