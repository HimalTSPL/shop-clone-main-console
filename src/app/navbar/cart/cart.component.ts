import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  productDetials: any;
  getcartList: any = [];
  // noData = false;
  total: any = 0;
  subtotal: any = 0;
  tax: any = 0;
  productData: any = [];
  quntity: number;
  cartList: any = [];
  maxQuantity: number;
  totalPrice: any;

  ngOnInit(): void {
    var va: any = localStorage.getItem('cartList');
    this.getcartList = JSON.parse(va);
    // console.log('this.getcartList: ', this.getcartList);
    this.getcartList.forEach((car) => {
      car.totalPrice = 0;
    });
    // if (
    //   this.getcartList &&
    // !this.getcartList.length &&
    //   this.getcartList !== null
    // ) {
    //   this.noData = true;
    // }
    this.getTotal();
  }

  buyProducts(products: any) {
    let arr = this.getcartList.filter(
      (p) => p.productsID !== products.productsID
    );
    this.cartList = arr;
    let text;
    // console.log('cartList: ', this.cartList);
    if (
      confirm(
        `you will buy ${products.userQuantity.value} ${products.productsName} `
      ) == true
    ) {
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
      this.router.navigate(['/home']);
    } else {
      // console.log('You  pressed canceled!');
      this.router.navigate(['/cart']);
    }
  }

  allCheckout() {
    this.getcartList.forEach((p) => {
      if (
        confirm(
          `congratulations, you buy ${p.userQuantity.value} ${p.productsName} `
        ) == true
      ) {
        localStorage.setItem('cartList', JSON.stringify(this.cartList));
        this.router.navigate(['/home']);
      } else {
        // console.log('You  pressed canceled!');
        this.router.navigate(['/cart']);
      }
    });
  }

  removeQuntity(products: any, index: any) {
    this.productData = products;
    if (products.userQuantity.value > 1) {
      this.quntity = products.userQuantity.value - 1;
      this.productData.userQuantity.value = this.quntity;
      let arr = this.getcartList.filter(
        (p) => p.productsID !== products.productsID
      );
      this.cartList = arr;
      this.cartList = [this.productData, ...this.cartList];
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
    } else {
      alert('0 item left!!!');
      this.deleteProducts(products);
    }
    this.getTotal();
  }
  addQuntity(products: any, index: any) {
    this.productData = products;

    let va = this.getcartList.filter(
      (p) => p.productsID == products.productsID
    );

    if (va[0].userQuantity.value < products.productsQuantity) {
      this.quntity = products.userQuantity.value + 1;
      this.productData.userQuantity.value = this.quntity;

      let arr = this.getcartList.filter(
        (p) => p.productsID !== products.productsID
      );
      // console.log('arr: ', arr);
      this.cartList = arr;
      this.cartList = [this.productData, ...this.cartList];
      // console.log('cartList: ', this.cartList);
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
    } else {
      alert('you rich max quantity');
    }
    this.getTotal();
  }

  getTotal() {
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
    this.totalPrice = 0;

    // let arr = this.cartList.map((ele) => ele.productsID);
    // console.log('arr: ', arr);

    if (this.getcartList) {
      this.getcartList.forEach((element: any) => {
        // console.log('element: ', element);
        this.subtotal += element.productsPrice * element.userQuantity.value;
        element.totalPrice = element.productsPrice * element.userQuantity.value;
      });
      // console.log(this.subtotal);
      this.tax = this.subtotal * 0.18;
      this.total = this.subtotal + this.tax;
    }
  }

  deleteProducts(item: any) {
    let arr = this.getcartList.filter((a) => a.productsID !== item.productsID);
    // console.log('arr', arr);
    localStorage.setItem('cartList', JSON.stringify(arr));

    this.router.navigate(['/home']);
  }
}
