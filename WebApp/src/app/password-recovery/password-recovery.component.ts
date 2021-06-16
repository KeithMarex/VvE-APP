import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  isError: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onReturnToLogin() {
    this.router.navigate(['/login']);
  }

}
