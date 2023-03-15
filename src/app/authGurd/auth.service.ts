import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  userLogIn() {
    return !!localStorage.getItem('token');
  }

  userLogout() {
    return localStorage.removeItem('token');
  }
}
