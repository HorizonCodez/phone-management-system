import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { apiUrl } = environment;

export type ApplicationUser = {
  id: string;
  email: string;
  type: 'Shop' | 'Customer' | 'Moderator';
  profile: {
    shopName?: string;
    firstName?: string;
    lastName?: string;
    profileImage: {
      url: string;
    };
  };
};

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  user = new BehaviorSubject<ApplicationUser | null>(null);
  user$: Observable<ApplicationUser | null> = this.user.asObservable();

  constructor(private http: HttpClient) {
    this.updateProfile();
  }

  ngOnDestroy(): void {}

  updateProfile() {
    this.http
      .get<ApplicationUser>(`${apiUrl}/auth/profile`, { withCredentials: true })
      .subscribe(
        (res) => {
          this.user.next(res);
        },
        (error) => {
          this.user.next(null);
        }
      );
  }

  signIn(data: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}/auth/login`, data, { withCredentials: true })
      .pipe(
        map((response) => {
          this.updateProfile();
          return response;
        })
      );
  }

  signOut(): void {
    this.http
      .post<any>(
        `${apiUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe((res) => {
        this.updateProfile();
      });
  }

  setLocalStorage({ id, type }: { id: string; type: string }): void {
    // store data on local storage
    localStorage.setItem('id', id);
    localStorage.setItem('type', type);
  }

  clearLocalStorage(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('type');
  }
}
