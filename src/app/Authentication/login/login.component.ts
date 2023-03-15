import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthoraztionService } from '../../Services/authoraztion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    // email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
    ]),
  });
  constructor(
    private authoriseService: AuthoraztionService,
    private router: Router
  ) {}

  get loginEmail() {
    return this.loginForm.get('email');
  }
  get loginPass() {
    return this.loginForm.get('password');
  }

  submitted = false;
  ngOnInit(): void {}

  signinUser() {
    // console.log(this.loginForm.value);
    const token = this.authoriseService.authLoginUSer(this.loginForm.value);
    if (token) {
      localStorage.setItem('token', token.userName);
      // localStorage.setItem('token', JSON.stringify(token));
      // console.log('Login Sucessfull!🎉');
      this.loginForm.reset();
      this.submitted = true;
      this.router.navigate(['/home']);
    } else {
      this.submitted = false;
      // console.log('Login User is not Valide!!☢');
      this.loginPass?.reset();
    }
  }
}
