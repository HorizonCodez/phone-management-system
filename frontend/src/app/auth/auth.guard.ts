import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const redirectRoute = '/login';
    const forbiddenRoute = '/forbidden';

    return this.authService.user$.pipe(
      map((user) => {
        console.log(user);
        if (user) {
          if (route.data.roles.includes(user.type)) {
            return true;
          }
          this.router.navigate([forbiddenRoute]);
          return false;
        } else {
          this.router.navigate([redirectRoute]);
          return false;
        }
      })
    );
  }
}
