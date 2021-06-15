import { Injectable } from "@angular/core";
import { Theme } from "../models/theme.model";
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

    getTheme(): any {
        var theme = this.getThemeFromStorage();

        if (!theme) {
            this.themeDao.getTheme()
            .subscribe(res => {
                console.log('fetching theme from db');
                this.setTheme(res);
            })
        }
        else {
            this.setTheme(theme);
        }
    }

    getThemeFromStorage(): any {
        var storedTheme = this.getValueFromStorage('theme');

        if (storedTheme) {
            storedTheme = JSON.parse(storedTheme);
        }

        return storedTheme;
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        localStorage.setItem('theme', JSON.stringify(this.theme));
        this.setColors();
    }

    setColors() {
        this.primaryColor = this.theme.primarycolor;
        this.secondaryColor = this.theme.secondarycolor;
    }
}