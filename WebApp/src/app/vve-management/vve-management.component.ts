import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Image } from 'src/shared/models/image.model';
import { OrganizationFile } from 'src/shared/models/organization-file.model';
import { Organization } from 'src/shared/models/organization.model';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { OrganizationDao } from 'src/shared/services/organization-dao.service';
import { from, Observable } from 'rxjs';

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
  detailsUploadLoading = false;
  detailsUploadError;
  organizationFiles: OrganizationFile[];
  fileUploadLoading = false;
  fileUploadError;

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
    this.detailsUploadLoading = true;

    var newTheme =
    {
      "primarycolor": formValues.primaryColor,
      "secondarycolor": formValues.secondaryColor
    }

    this.organizationDao.updateTheme(newTheme)
    .subscribe(() => {
      this.dataStorageService.setTheme(newTheme);
    }, err => {
      this.detailsUploadError = err.statusText;
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
      }, err => {
        this.detailsUploadError = err.statusText;
      })
      .add(() => {
        this.detailsUploadLoading = false;
      }); 
    } else {
      this.detailsUploadLoading = false;
    }
  }

  onLogoFileChanged(event) {
    this.newLogo = event.target.files[0];
  }

  onFileUpload(event) {
    this.fileUploadLoading = true;
    const mForm = new FormData();
    var file = event.target.files[0]

    if (file.size < 16777216) { // File cannot be larger than 16MB (16777216 bytes)
      mForm.append('file', file);

      this.organizationDao.postFile(mForm)
      .subscribe(() => {
        location.reload();
      }, err => {
        this.fileUploadError = err.statusText;
      })
      .add(() => {
        this.fileUploadLoading = false;
      });
    }
    else {
      this.fileUploadError = 'Bestanden mogen niet groter dan 16MB zijn.';
      this.fileUploadLoading = false;
    }
  }

  onDeleteFile(file: OrganizationFile) { //TODO
    console.log(file.filename);
  }

  onDownloadFile(file: OrganizationFile): void {
    this.organizationDao.getFile(file._id)
    .subscribe(res => {
      this.downloadFile(res, "application/pdf");
    });
  }

  downloadFile(data: any, type: string): void {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
