import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthoriseGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate() {
    const token: any = localStorage.getItem('token');
    if (token == 'Mr_lakhani') {
      return true;
    }
    alert('you are not access this service');
    this.router.navigate(['/home']);
    return false;
  }
}
