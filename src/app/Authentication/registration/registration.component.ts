import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { userInfo } from 'src/app/updateData';
import { AuthoraztionService } from '../../Services/authoraztion.service';
import { passwordMatch } from './passwordMtach';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  @Input() password = '';
  @Input() coPassword = '';

  ngOnInit() {
    // this.registerData()
    this.getCountry()
    this.getStates()
  }
  registerForm: FormGroup;

  country: any = [];
  countryList: any = [];
  selectedCountry: any = null;
  selectedStates: any = null;
  citiesList: any = [];
  cityList: any = [];
  states: any = [];
  statesList: any = [];
  user_info: userInfo;
  constructor(
    private authoriseService: AuthoraztionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _http: HttpClient,
  ) {
    this.user_info = new userInfo();
  }

  registrationForm = new FormGroup(
    {
      userID: new FormControl('0'),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('Choose...', [Validators.required]),
      country: new FormControl('Choose...', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
      ]),
      coPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
      ]),
      // gender: new FormControl('Male', Validators.required),
    },
    [passwordMatch('password', 'coPassword')]
  );


  get userFName(): any {
    return this.registrationForm.get('firstName');
  }
  get userLName() :any {
    return this.registrationForm.get('lastName');
  }
  get userData() :any {
    return this.registrationForm.get('userName');
  }
  get email() :any {
    return this.registrationForm.get('email');
  }
  get address() :any {
    return this.registrationForm.get('address1');
  }
  get countryD() :any {
    return this.registrationForm.get('country');
  }
  get state() :any {
    return this.registrationForm.get('state');
  }
  get city() :any {
    return this.registrationForm.get('city');
  }
  get zip() :any {
    return this.registrationForm.get('zip');
  }
  get pass() :any {
    return this.registrationForm.get('password');
  }
  get coPass() :any {
    return this.registrationForm.get('coPassword');
  }
  submitted = false;

  user: any = {};
  userList: any = [];

  registerUser() {

    if (
      this.registrationForm.valid
    ) {
      this.submitted = false;
      let isUserExist = this.authoriseService.checkUserExist(
        this.registrationForm.value
      );
      // this.authoriseService.addUser(this.user);
      if (isUserExist == true) {
        this.showMessage('user Exists.....!');
      } else {
        this.submitted = true;
        // console.log(this.registerForm.value);
        this.userList = {
          userID: 0,
          firstName: this.registrationForm.value.firstName,
          lastName: this.registrationForm.value.lastName,
          email: this.registrationForm.value.email,
          userName: this.registrationForm.value.userName,
          address1: this.registrationForm.value.address1,
          address2: this.registrationForm.value.address2,
          city: this.registrationForm.value.city,
          state: this.registrationForm.value.state,
          country: this.registrationForm.value.country,
          zip: this.registrationForm.value.zip,
          password: this.registrationForm.value.password,
          coPassword: this.registrationForm.value.coPassword,
        };
        console.log('userList: ', this.userList);
        this.user = Object.assign(this.user, this.userList);
        this.authoriseService.addUser(this.user);
        this.registrationForm.reset();
        this.showMessage('user register successful....!');
        this.router.navigate(['/login']);
      }
    } else {
      let key = Object.keys(this.registrationForm.controls);
      console.log('this.registrationForm.controls): ', this.registrationForm.controls);
      key.filter((data: any) => {
        // console.log(data);
        let control = this.registrationForm.controls[data];
        // if (control.errors != null) 
        control.markAllAsTouched();
      })
      this.showMessage('please fill all the details...');
    }
  }

  showMessage(msg: any) {
    alert(msg);
  }

  getCountry() {
    this._http.get('https://countriesnow.space/api/v0.1/countries/states').subscribe((res) => {
      if (res) {
        this.country = res
        this.countryList = this.country.data;
      }
    })
    this.countryList = this.country.data;
  }

  getStates() {
    if (this.countryList && this.countryList.length) {
      this.states = this.countryList.filter((a: any) => a.name == this.selectedCountry)
      this.statesList = this.states[0].states
      // console.log('statesList: ', this.statesList.length);
    }
  }

  selectCountry(event) {
    this.selectedCountry = event.target.value
    this.getStates()
  }

  selectStates(event) {
    this.selectedStates = event.target.value
    // this.getCity()
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log('charCode: ', charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // toggleShow() {
  //   this.showPassword = !this.showPassword;
  //   this.input.type = this.showPassword ? 'text' : 'password';
  // }

  // registerData() {
  //   this.registerForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  //     user: ['', [Validators.required, Validators.minLength(2)]],
  //     address1: ['', Validators.required],
  //     address2: ['', Validators.required],
  //     city: ['', Validators.required],
  //     state: ['Choose...', Validators.required],
  //     country: ['Choose...', Validators.required],
  //     zip: ['', [Validators.required, Validators.maxLength(6)]],
  //     password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
  //     confirmPass: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
  //   })
  //   this.getCountry()
  // }

  // registration() {
  //   console.log(this.registerForm.value);
  // }
}