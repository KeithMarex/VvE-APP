import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme } from "../models/theme.model";
import { OrganizationDao } from "./organization-dao.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    logoUrl = new BehaviorSubject<string>('');
    private loggedInUserId: string = this.getValueFromStorage('userId');

    constructor(private organizationDao: OrganizationDao) {}

    getValueFromStorage(key: string): string {
        var storageValue =  localStorage.getItem(key);

        return storageValue || null;
    }

    getLoggedInUserId(): string {
        return this.loggedInUserId;
    }

    setLoggedInUserId(user: string): void {
        this.loggedInUserId = user;
        localStorage.setItem('userId', user);
        
        this.initializeTheme();
    }

    initializeTheme() {
        var isLoggedIn = this.getValueFromStorage('userId') != null;

        if (isLoggedIn) {
            this.getOrganizationFromDao();
        }
    }

    getThemeFromDao() {
        this.organizationDao.getTheme()
        .subscribe(res => {
            this.setTheme(res);
        });
    }

    getOrganizationFromDao() {
        this.organizationDao.getOrganization()
        .subscribe(res => {
            this.setTheme(res.Theme);
            if (res.logo.image_url) {
                this.logoUrl.next(res.logo.image_url);
            }
        })
    }

    setTheme(theme: Theme) {
        document.documentElement.style.setProperty('--dynamic-primary', theme.primarycolor);
        document.documentElement.style.setProperty('--dynamic-secondary', theme.secondarycolor);
    }

}