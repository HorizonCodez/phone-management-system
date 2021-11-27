import { Component, OnInit } from '@angular/core';
import { ApplicationUser, AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  public user: ApplicationUser | null = null;
  search: string = '';

  constructor(public authService: AuthService, private router: Router) {
    authService.user$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  logout() {
    this.authService.signOut();
  }

  searchNow() {
    console.log(this.search);
    this.router.navigate(['/'], { queryParams: { search: this.search } });
  }
}
