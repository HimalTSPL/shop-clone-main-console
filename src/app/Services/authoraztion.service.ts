import { Injectable } from '@angular/core';
import { userInfo } from '../updateData';

@Injectable({
  providedIn: 'root',
})
export class AuthoraztionService {
  user_info: userInfo;
  usersData: any = [];
  userData: any = [];
  productsData: any = [];

  constructor() {
    this.user_info = new userInfo();
  }

  // for registartion
  addUser(user: any) {
    if (localStorage.getItem('Value')) {
      let va: any = localStorage.getItem('Value');
      this.usersData = JSON.parse(va);
      user.userID = this.usersData.length;
      this.usersData = [user, ...this.usersData];
    } else {
      user.userID = 0;
      this.usersData = [user];
    }
    localStorage.setItem('Value', JSON.stringify(this.usersData));
  }

  // for chek duplicate details
  checkUserExist(usersData: any): boolean {
    let va: any = localStorage.getItem('Value');
    this.userData = JSON.parse(va);
    let registerUsers = this.usersData;
    let isUserExist = false;
    for (let i = 0; i < this.usersData.length; i++) {
      if (
        registerUsers[i].userName == usersData.userName ||
        registerUsers[i].email == usersData.email
      ) {
        isUserExist = true;
      }
    }
    return isUserExist;
  }

  // for login
  authLoginUSer(user: any) {
    let loginUsersData = [];
    if (localStorage.getItem('Value')) {
      let s: any = localStorage.getItem('Value');
      loginUsersData = JSON.parse(s);
    }
    return loginUsersData.find(
      (p: { email: any; password: any }) =>
        (p.email === user.email || p.email === user.userName) &&
        p.password === user.password
    );
    //       ((p: { email: any; password: any }) =>
    //     ((p.email === user.email && p.password === user.password) || ( p.email === user.userName && p.password === user.password))
    // );
  }

  addProducts(products: any) {
    if (localStorage.getItem('productsList')) {
      let va: any = localStorage.getItem('productsList');
      this.productsData = JSON.parse(va);
      products.productsID = this.productsData.length;
      this.productsData = [products, ...this.productsData];
    } else {
      products.productsID = 0;
      this.productsData = [products];
    }
    localStorage.setItem('productsList', JSON.stringify(this.productsData));
  }
}
