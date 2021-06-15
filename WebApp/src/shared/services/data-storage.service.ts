import { Injectable } from "@angular/core";
import { Theme } from "../models/theme.model";
import { ThemeDao } from "./theme-dao.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private theme: Theme;
    private primaryColor: string = '#451864'; // Default color value
    private secondaryColor: string = '#A0CAE8'; // Default color value
    private loggedInUserId: string = this.getValueFromStorage('userId');

    constructor(private themeDao: ThemeDao) {
        this.checkThemeAvailability();
    }

    // Get a value from local storage
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

    checkThemeAvailability() {
        this.theme = JSON.parse(localStorage.getItem('theme'));
        
        if (!this.theme) {
            this.themeDao.getTheme()
            .subscribe(res => {
                this.setTheme(res);
            });
        }
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        localStorage.setItem('theme', JSON.stringify(this.theme));
        this.setColors();
    }

    setColors() {
        this.primaryColor = this.theme.primaryColor;
        this.secondaryColor = this.theme.secondaryColor;
    }
}