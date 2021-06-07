import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Component({
  selector: 'app-vve-management',
  templateUrl: './vve-management.component.html',
  styleUrls: ['./vve-management.component.scss']
})
export class VveManagementComponent implements OnInit {
  primaryColor = this.dataStorageService.getPrimaryColor();
  secondaryColor = this.dataStorageService.getSecondaryColor();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onChangeStyling(form: NgForm) {
    const formValues = form.value;

    this.dataStorageService.setPrimaryColor(formValues.primaryColor);
    this.dataStorageService.setSecondaryColor(formValues.secondaryColor);
  }

}
