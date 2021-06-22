import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Image } from 'src/shared/models/image.model';
import { OrganizationFile } from 'src/shared/models/organization-file.model';
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
  primaryColor = '#000000';
  secondaryColor = '#000000';
  logo: Image;
  newLogoName: string; // Based on uploaded file
  newLogo: File;
  organizationFiles: OrganizationFile[];

  constructor(private dataStorageService: DataStorageService, private organizationDao: OrganizationDao) { }

  ngOnInit(): void {
    this.getOrganizationDetails();
    this.getOrganizationFiles();
  }

  getOrganizationDetails() {
    this.organizationDao.getOrganization()
    .subscribe(res => {
      this.setOrganizationDetails(res);
    });
  }

  getOrganizationFiles() {
    this.organizationDao.getFiles()
    .subscribe(res => {
      this.organizationFiles = res;
    });
  }

  setOrganizationDetails(organization: Organization) {
    this.organization = organization;
    this.primaryColor = this.organization.Theme.primarycolor;
    this.secondaryColor = this.organization.Theme.secondarycolor;
    this.logo = this.organization.logo;
  }

  onChangeStyling(form: NgForm) {
    const formValues = form.value;
    const mForm = new FormData();

    var newTheme =
    {
      "primarycolor": formValues.primaryColor,
      "secondarycolor": formValues.secondaryColor
    }

    this.organizationDao.updateTheme(newTheme)
    .subscribe(() => {
      this.dataStorageService.setTheme(newTheme);
    });

    var newName = formValues.name;
    
    if (newName) {
      mForm.append('name', formValues.name);
    }
    if (this.newLogo)
    {
      mForm.append('logo', this.newLogo);
    }

    if (newName || this.newLogo)
    {
      this.organizationDao.updateDetails(mForm)
      .subscribe(() => {
        location.reload();
      }); 
    }
  }

  onLogoFileChanged(event) {
    this.newLogo = event.target.files[0];
  }

  onFileUpload(event) {
    const mForm = new FormData();

    mForm.append('file', event.target.files[0]);

    this.organizationDao.postFile(mForm)
    .subscribe(res => {
      console.log(res);
    });
  }
}
