import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { ThemeDao } from 'src/shared/services/theme-dao.service';

@Component({
  selector: 'app-vve-management',
  templateUrl: './vve-management.component.html',
  styleUrls: ['./vve-management.component.scss']
})
export class VveManagementComponent implements OnInit, OnDestroy {
  primaryColor = '';
  secondaryColor = '';
  
  primaryColorSub: Subscription;
  secondaryColorSub: Subscription;
  logo: string = 'de-nieuwe-wereld-logo.svg'; //TODO replace with file

  constructor(private dataStorageService: DataStorageService, private themeDao: ThemeDao) { }

  ngOnInit(): void {
    this.handleSubscriptions();
  }

  ngOnDestroy(): void {
    this.primaryColorSub.unsubscribe();
    this.secondaryColorSub.unsubscribe();
  }

  handleSubscriptions(): void {
    this.primaryColorSub = this.dataStorageService.primaryColor.subscribe(newColor => {
      this.primaryColor = newColor;
    });

    this.secondaryColorSub = this.dataStorageService.secondaryColor.subscribe(newColor => {
      this.secondaryColor = newColor;
    });
  }

  onChangeStyling(form: NgForm) {
    const formValues = form.value;

    var newTheme =
    {
      "primarycolor": formValues.primaryColor,
      "secondarycolor": formValues.secondaryColor
    }

    document.documentElement.style.setProperty('--dynamic-primary', newTheme.primarycolor);
    document.documentElement.style.setProperty('--dynamic-secondary', newTheme.secondarycolor);

    // this.themeDao.updateTheme(newTheme)
    // .subscribe(() => {
    //   this.dataStorageService.setTheme(newTheme);
    //   window.location.reload();
    // });
  }



}
