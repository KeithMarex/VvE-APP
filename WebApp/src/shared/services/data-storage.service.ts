import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private primaryColor: string = this.getColorFromStorage('primaryColor') || '#451864';
    private secondaryColor: string = this.getColorFromStorage('secondaryColor') || '#A0CAE8';
    private loggedInUserId: string;

    getColorFromStorage(key: string): string {
        var storageValue =  localStorage.getItem(key);

        return storageValue ? storageValue : null;
    }

    getPrimaryColor(): string {
        return this.primaryColor;
    }

    setPrimaryColor(color: string): void {
        this.primaryColor = color;
        localStorage.setItem('primaryColor', color);
    }

    getSecondaryColor(): string {
        return this.secondaryColor;
    }

    setSecondaryColor(color: string): void {
        this.secondaryColor = color;
        localStorage.setItem('secondaryColor', color);
    }

    getLoggedInUserId(): string {
        return this.loggedInUserId;
    }

    setLoggedInUserId(user: string): void {
        this.loggedInUserId = user;
    }
}