import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { AuthoraztionService } from 'src/app/Services/authoraztion.service';

@Component({
  selector: 'temp-add',
  templateUrl: './temp-add.component.html',
  styleUrls: ['./temp-add.component.css'],
})
export class TempAddProductsComponent implements OnInit {
  msg: any = '';
  udata: any = [];
  editMode = false;
  data: any;
  pID: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiserviceService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.pID = params.get('id');
      if (this.pID) {
        console.log('pID: ', this.pID);
        this.editMode = true;
        this.apiService.getupdatedata(this.pID).subscribe((data: any) => {
          // this.Udata = data.getUData;
          this.udata.push(data.getUData);
          // console.log('this.udata: ', this.udata);

          this.addProductsForm.patchValue({
            productsCategory: this.udata[0].productsCategory,
            productsName: this.udata[0].productsName,
            productsPrice: this.udata[0].productsPrice,
            productsQuantity: this.udata[0].productsQuantity,
            productsDescription: this.udata[0].productsDescription,
          });
        });
      }
      if (this.pID == 'add') {
        this.editMode = false;
      }
    });
  }

  // addProductsForm: any;

  ngOnInit(): void {
    console.log('udata: ', this.udata);
    // console.log('0dta', this.udata[0].productsCategory);
  }

  addProductsForm = new FormGroup({
    productsCategory: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    productsName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    productsPrice: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    productsQuantity: new FormControl('', [
      Validators.required,
      // Validators.max(100),
    ]),
    productsDescription: new FormControl('', [
      Validators.required,
      // Validators.minLength(15),
    ]),
  });

  get pCategory() {
    return this.addProductsForm.get('productsCategory');
  }
  get pName() {
    return this.addProductsForm.get('productsName');
  }
  get pPrice() {
    return this.addProductsForm.get('productsPrice');
  }
  get pQuantity() {
    return this.addProductsForm.get('productsQuantity');
  }
  get pDescription() {
    return this.addProductsForm.get('productsDescription');
  }

  registerProducts() {
    // const currentDate = moment().format('DD-MM-YYYY');
    // const currentTime = moment().format('hh:mm:ss a');

    // this.addProductsForm.value.date = currentDate;
    // this.addProductsForm.value.time = currentTime;

    this.apiService
      .savedata(this.addProductsForm.value)
      .subscribe((data: any) => {});
    this.cancel();
  }

  updatedata() {
    this.apiService
      .updatedata({
        _id: this.pID,
        productsCategory: this.addProductsForm.value.productsCategory,
        productsName: this.addProductsForm.value.productsName,
        productsPrice: this.addProductsForm.value.productsPrice,
        productsQuantity: this.addProductsForm.value.productsQuantity,
        productsDescription: this.addProductsForm.value.productsDescription,
      })
      .subscribe((data: any) => {
        this.msg = data.msg;
      });

    this.cancel();
  }
  cancel() {
    this.editMode = false;
    this.addProductsForm.reset();
    this.router.navigate(['/temp-product']);
  }
}
