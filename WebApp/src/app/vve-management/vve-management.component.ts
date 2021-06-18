import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Organization } from 'src/shared/models/organization.model';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { OrganizationDao } from 'src/shared/services/organization-dao.service';

@Component({
  selector: 'app-vve-management',
  templateUrl: './vve-management.component.html',
  styleUrls: ['./vve-management.component.scss']
})
export class VveManagementComponent implements OnInit {
  organization: Organization
  primaryColor = '';
  secondaryColor = '';
  logo = '';

  constructor(private dataStorageService: DataStorageService, private organizationDao: OrganizationDao) { }

  ngOnInit(): void {
    this.getOrganizationDetails();
  }

  getOrganizationDetails() {
    this.organizationDao.getOrganization()
    .subscribe(res => {
      this.organization = res;
      this.primaryColor = this.organization.Theme.primarycolor;
      this.secondaryColor = this.organization.Theme.secondarycolor;
      this.logo = this.organization.logo.name;
    })
  }

  onChangeStyling(form: NgForm) {
    const formValues = form.value;

    var newTheme =
    {
      "primarycolor": formValues.primaryColor,
      "secondarycolor": formValues.secondaryColor
    }

    this.organizationDao.updateTheme(newTheme)
    .subscribe(() => {
      this.dataStorageService.setTheme(newTheme);
    });
  }



}
