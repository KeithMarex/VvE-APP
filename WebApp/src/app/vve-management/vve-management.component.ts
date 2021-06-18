import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Image } from 'src/shared/models/image.model';
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
  logo: Image;

  constructor(private dataStorageService: DataStorageService, private organizationDao: OrganizationDao) { }

  ngOnInit(): void {
    this.getOrganizationDetails();
  }

  getOrganizationDetails() {
    this.organizationDao.getOrganization()
    .subscribe(res => {
      this.setOrganizationDetails(res);
    })
  }

  setOrganizationDetails(organization: Organization) {
    this.organization = organization;
    this.primaryColor = this.organization.Theme.primarycolor;
    this.secondaryColor = this.organization.Theme.secondarycolor;
    this.logo = this.organization.logo;
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
