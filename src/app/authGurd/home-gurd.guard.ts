import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGurdGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (!this.auth.userLogIn()) {
      return true;
      // this.router.navigate(['/dashborad']);
    }
    alert('you are already logged in');
    this.router.navigate(['/dashborad']);
    return false;
  }
}
