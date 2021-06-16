import { AuthDao } from '../../shared/services/auth-dao.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isLoading: boolean;
  isAdmin: boolean = true;
  isError: boolean;

  constructor(private authDao: AuthDao, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {}

  login(form: NgForm): void {
    this.isError = false;
    this.isAdmin = true;
    this.isLoading = true;
    if (form.invalid) { return; }

    const values: {
      email: string;
      password: string;
    } = form.value;


    this.authDao
      .login(
        values.email,
        values.password,
      )
      .subscribe(
        (user: User) => {
          if (user.role == 'admin') {
            this.dataStorageService.setLoggedInUserId(user._id);
            this.router.navigate(['/ticket-overview']);
          }
          else {
            this.isAdmin = false;
            this.isLoading = false;
          }
        },
        (error: HttpErrorResponse) => {
          this.isError = true;
          this.isLoading = false;
        }
      );
  }
}
