import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authGurd/auth.service';

import { CartservicesService } from 'src/app/Services/cartservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productData: any = [];
  noData = false;
  constructor(
    private router: Router,
    private authservice: AuthService,
    private cartservice: CartservicesService
  ) {}
  getProductsList: any = [];
  quntity: number;
  userQuantity: number;
  maxQuantity: number;

  ngOnInit(): void {
    this.loadcart();
    if (this.getProductsList.length !== 0) {
      this.noData = true;
    }
    this.quntity = 1;
  }

  loadcart() {
    var va: any = localStorage.getItem('productsList');
    this.getProductsList = JSON.parse(va);
    this.getProductsList.forEach((car) => {
      car.userQuantity = new FormControl(1);
    });
    // this.userQuantity = this.getProductsList[length].userQuantity.value;
  }

  userLogIn() {
    return this.authservice.userLogIn();
  }

  removeQuntity(item: any) {
    this.productData = item;
    if (item.userQuantity.value > 1) {
      this.quntity = item.userQuantity.value - 1;
      // console.log('index  ', item.userQuantity.value);
      this.productData.userQuantity.value = this.quntity;
    } else {
      alert('0 item left!!!');
    }
  }

  addQuntity(item: any) {
    this.productData = item;

    let va = this.getProductsList.filter(
      (p) => p.productsID == item.productsID
    );
    // for maxQuantity
    let a = localStorage.getItem('cartList');
    let list: any = JSON.parse(a);
    // console.log('list: ', list);
    let ls = list.filter((p) => p.productsID == item.productsID);
    // console.log('ls: ', ls);

    // console.log('valid q: ', va[0].productsQuantity);
    this.maxQuantity = item.productsQuantity - ls[0].userQuantity.value;
    // console.log('this.maxQuantity: ', this.maxQuantity);

    if (va[0].userQuantity.value < this.maxQuantity) {
      // console.log('index  ', item.userQuantity.value);
      this.quntity = item.userQuantity.value + 1;
      this.productData.userQuantity.value = this.quntity;
    } else {
      alert('you rich max quantity');
    }
  }

  products: any = {};
  addToCart(item: any) {
    this.productData = item;
    if (item.userQuantity.value < item.productsQuantity) {
      this.productData.userQuantity.value = this.quntity;
      this.products = Object.assign(this.products, this.productData);
      this.cartservice.addToCart(this.products);
    }
    this.router.navigate(['/cart']);
  }

  buyProducts(item: any) {
    console.log(item);
    console.log('buy!!');
  }
}
