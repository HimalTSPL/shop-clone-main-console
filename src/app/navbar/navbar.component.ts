import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authGurd/auth.service';
// import { AuthoraztionService } from '../Services/authoraztion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authservice: AuthService) { }

  ngOnInit(): void { }

  adminLogin() {
    const token: any = localStorage.getItem('token');
    if (token == 'Mr_lakhani') {
      return true;
    } else {
      return false;
    }
  }

  userLogIn() {
    return this.authservice.userLogIn();
  }

  userLogout() {
    // confirm('are sure logout!!!');
    if (confirm('Are you sure?')) {
      return this.authservice.userLogout();
    }
  }
}