import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthoraztionService } from 'src/app/Services/authoraztion.service';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css'],
})
export class DashboradComponent implements OnInit {
  holiday: any;

  moment() {
    // this.holiday = moment().format('LLLL');
    this.holiday = moment().format('dddd MMMM Do YYYY, h:mm:ss a');
  }
  constructor(
    private router: Router,
    private authorizationService: AuthoraztionService
  ) {}
  getProductsList: any = [];
  editProductsDetails: any = [];

  ngOnInit(): void {
    this.loadProucts();
    this.moment();
  }
  loadProucts() {
    var va: any = localStorage.getItem('productsList');
    this.getProductsList = JSON.parse(va);
    console.log('this.getProductsList: ', this.getProductsList);
  }

  deleteProducts(item: any) {
    if (item.productsID >= 0) {
      // console.log(item.productsID);
      let arr = this.getProductsList.filter(
        (a) => a.productsID !== item.productsID
      );
      // console.log('arr', arr);
      localStorage.setItem('productsList', JSON.stringify(arr));
    }
    this.loadProucts();
  }
}
