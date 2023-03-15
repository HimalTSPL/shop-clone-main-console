import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartservicesService {
  constructor() {}
  productsData: any = [];
  array: any = [];
  quantity: number;
  maxQuantity: number;

  addToCart(products: any) {
    if (localStorage.getItem('cartList')) {
      let va: any = localStorage.getItem('cartList');
      this.productsData = JSON.parse(va);

      const arr = this.productsData.filter(
        (p) => p.productsID == products.productsID
      );
      if (arr.length >= 1) {
        // duplicate cart list are remove and add reset quntity
        let sum;
        for (let item of arr) {
          for (let i = 1; i <= arr.length; i++) {
            sum = item.userQuantity.value;
          }
        }
        this.quantity = sum;

        // real data store
        this.array = this.productsData.filter(
          (p) => p.productsID !== products.productsID
        );

        // quantity  validaion
        if (this.quantity < products.productsQuantity) {
          products.userQuantity.value =
            this.quantity + products.userQuantity.value;
          this.productsData = this.array;
        } else {
          products.userQuantity.value = products.productsQuantity;
          this.productsData = this.array;
          alert('out off stock!!');
        }
      }
      this.productsData = [products, ...this.productsData];

      //
    } else {
      this.productsData = [products];
    }
    localStorage.setItem('cartList', JSON.stringify(this.productsData));
  }
}
