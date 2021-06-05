import { AuthDao } from '../../shared/services/auth-dao.service';
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

  constructor(private authDao: AuthDao, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
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
            this.router.navigate(['/ticket-overview']);
          }
          else {
            console.log('geen admin');
          }
        },
        (error: HttpErrorResponse) => {
          console.log('mislukt!');
        }
      );
  }
}
