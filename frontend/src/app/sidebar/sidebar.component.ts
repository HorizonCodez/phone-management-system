import { Component, OnInit } from '@angular/core';
import { ApplicationUser, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user: ApplicationUser | null = null;

  constructor(private authService: AuthService) {
    authService.user$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}
}
