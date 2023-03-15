import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordMatch } from 'src/app/Authentication/registration/passwordMtach';
import { AuthoraztionService } from 'src/app/Services/authoraztion.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  // userDataList: userInfo;
  userDataList: any = [];
  user: any = {};
  userName: any = {};
  userDetails: any;
  editMode = false;
  pID: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // this.userDataList = new userInfo();
  }

  ngOnInit(): void {
    var va: any = localStorage.getItem('Value');
    this.userDataList = JSON.parse(va);

    let u: any = localStorage.getItem('token');
    //  console.log('va: ', u);

    this.activatedRoute.paramMap.subscribe((params) => {
      this.pID = +params.get('id');
      if (this.pID >= 0) {
        this.userDetails = this.userDataList.filter(
          (a) => a.userID == this.pID
        );
        this.editMode = true;
      } else {
        this.userDetails = this.userDataList.filter((p) => p.userName == u);
        this.editMode = true;
      }
    });

    this.userName = this.userDetails[0].userName;

    // console.log('userDetails: ', this.userDetails);
    if (this.userDetails && this.userDetails.length) {
      this.updateUserForm.patchValue({
        userName: this.userDetails[0].userName,
        email: this.userDetails[0].email,
        password: this.userDetails[0].password,
        coPassword: this.userDetails[0].coPassword,
      });
    }
  }

  updateUserForm = new FormGroup(
    {
      userID: new FormControl('0'),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
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

  get userData() {
    return this.updateUserForm.get('userName');
  }
  get email() {
    return this.updateUserForm.get('userEmail');
  }
  get pass() {
    return this.updateUserForm.get('password');
  }
  get coPass() {
    return this.updateUserForm.get('coPassword');
  }

  updateUser() {
    const updateData: any = this.updateUserForm.value;
    // console.log('updateData: ', updateData);
    const editdata: any = this.userDataList.filter(
      (r) => r.userName != updateData.userName && r.email != updateData.email
    );
    // console.log('filterData: ', editdata);
    editdata.push(updateData);
    // console.log('updatedUserList: ', editdata);

    localStorage.setItem('Value', JSON.stringify(editdata));
    this.onClose();
  }

  onClose() {
    this.updateUserForm.reset();
    this.router.navigate(['/home']);
    return localStorage.removeItem('editData');
  }
}
