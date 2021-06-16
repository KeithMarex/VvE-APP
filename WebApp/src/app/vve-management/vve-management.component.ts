import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { ThemeDao } from 'src/shared/services/theme-dao.service';

@Component({
  selector: 'app-vve-management',
  templateUrl: './vve-management.component.html',
  styleUrls: ['./vve-management.component.scss']
})
export class VveManagementComponent implements OnInit {
  primaryColor = this.dataStorageService.getPrimaryColor();
  secondaryColor = this.dataStorageService.getSecondaryColor();
  logo: string = 'de-nieuwe-wereld-logo.svg'; //TODO replace with file

  constructor(private dataStorageService: DataStorageService, private themeDao: ThemeDao) { }

  ngOnInit(): void {
  }

  onChangeStyling(form: NgForm) {
    const formValues = form.value;

    var newTheme =
    {
      "primarycolor": formValues.primaryColor,
      "secondarycolor": formValues.secondaryColor
    }

    this.themeDao.updateTheme(newTheme)
    .subscribe(() => {
      this.dataStorageService.setTheme(newTheme);

      window.location.reload();
    });
  }



}
