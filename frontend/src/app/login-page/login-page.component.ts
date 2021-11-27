import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  email = '';
  password = '';
  error?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.error = undefined;
    this.authService
      .signIn({ email: this.email, password: this.password })
      .subscribe(
        (res: any) => {
          this.activatedRoute.queryParams.subscribe((params) => {
            const redirect = params.redirect || '/';
            this.router.navigateByUrl(redirect);
          });
        },
        (error: any) => {
          this.error = error.error.message;
        }
      );
  }
}
