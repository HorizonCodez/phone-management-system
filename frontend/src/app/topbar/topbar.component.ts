import { Component, OnInit } from '@angular/core';
import { ApplicationUser, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  public user: ApplicationUser | null = null;

  constructor(public authService: AuthService) {
    authService.user$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  logout() {
    this.authService.signOut();
  }
}
