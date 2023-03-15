import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthoraztionService } from 'src/app/Services/authoraztion.service';
import { userInfo } from 'src/app/updateData';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  getUserList: any = [];
  userDetails: any = [];
  user_info: userInfo[];
  userName: any = {};
  selectDetails: any = []
  selectedDetails: any = new FormControl('city');
  productsForm: FormGroup;
  userdetails: any = [
    {
      name: "Address line 1",
      id: "address1"
    },
    {
      name: "Address line 2",
      id: "address2"
    },
    {
      name: "Country",
      id: "country"
    },
    {
      name: "State",
      id: "state"
    },
    {
      name: "City",
      id: "city"
    },
    {
      name: "Pincode",
      id: "zip"
    },
  ];

  constructor(private authSrvice: AuthoraztionService, private router: Router, private formbuilder: FormBuilder) {
    this.user_info = [];
  }

  ngOnInit(): void {
    this.createForm();
    this.loadData();

    // this.userDetails = this.getUserList;
  }

  loadData() {
    var va: any = localStorage.getItem('Value');
    this.getUserList = JSON.parse(va);
    // console.log('this.getUserList: ', this.getUserList);

    var user: any = localStorage.getItem('token');
    this.userName = user;
  }

  deleteData(index: any) {
    // console.log('index: ', index);
    let userName: any = index.userName;
    let useremail: any;
    let s: any = localStorage.getItem('token');
    if (index.userID >= 0) {
      if (
        userName == s ||
        userName == 'Mr_lakhani' ||
        useremail == 'lakhani@mail.io ̑'
      ) {
        alert('you can not access this data ');
      } else {
        // console.log(index.userID);
        let arr = this.getUserList.filter((a) => a.userID !== index.userID);
        // console.log('arr', arr);
        localStorage.setItem('Value', JSON.stringify(arr));
      }
    }
    this.loadData();
  }

  // details(event) {
  //   let select = event.id;
  //   // console.log('select: ', select);
  //   // let user = this.getUserList.filter((i: any) => i.city)
  //   // this.selectDetails = user
  //   console.log('this.selectDetails: ', this.selectDetails);
  // }
  /// add more form

  createForm() {
    this.productsForm = this.formbuilder.group({
      category: [null, Validators.required],
      details: this.formbuilder.array([]),
    })
    this.addDetails({
      name: '',
      quantity: '',
      price: '',
      description: '',
    })
  }

  detailss(): FormArray {
    return this.productsForm.get("details") as FormArray
  }

  addDetails(obj?: any) {
    this.detailss().push(this.newDetails(obj));
  }

  newDetails(obj?: any): FormGroup {
    return this.formbuilder.group({
      name: [obj? obj.name : '', Validators.required],
      quantity: [obj ? obj.quantity : ''],
      price: [obj ? obj.price : ''],
      description: [obj ? obj.description : ''],
    })
  }

  removeDetails(i: number) {
    // console.log(this.productsForm.value.details.length);
    if (this.productsForm.value.details.length > 1) {
      this.detailss().removeAt(i);
    }
  }

  copy(i: number) {
    // console.log(this.productsForm.value.details[i].description);
    this.addDetails(this.productsForm.value.details[i]);
    // this.detailss().at(i + 1).patchValue({
    //   name: this.productsForm.value.details[i].name,
    //   quantity: this.productsForm.value.details[i].quantity,
    //   price: this.productsForm.value.details[i].price,
    //   description: this.productsForm.value.details[i].description,
    // })

  }

  saveProducts() {

    if (this.productsForm.invalid) {
      alert('Please fill up all details')
      // markAsTouched()
    } else {
      console.log(this.productsForm.value);
      let length:number = this.productsForm.value.details.length
      console.log("length>>",length);
      for (let i = 0; i <=length; i++){
        // console.log(i);
        this.detailss().removeAt(i);
      }
      
      this.productsForm.reset();
    }
  }

}