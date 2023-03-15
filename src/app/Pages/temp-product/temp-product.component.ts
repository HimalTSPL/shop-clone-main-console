import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/authGurd/auth.service';
import { ApiserviceService } from 'src/app/Services/apiservice.service';

@Component({
  selector: 'temp-product',
  templateUrl: './temp-product.component.html',
  styleUrls: ['./temp-product.component.css'],
})
export class TempProductComponent implements OnInit {
  alldata: any = [];
  maindata: any = [];
  editMode = false;
  allpage: number;


  constructor(
    private router: Router,
    private authservice: AuthService,
    private apiService: ApiserviceService
  ) { }

  adminLogin() {
    const token: any = localStorage.getItem('token');
    if (token == 'Mr_lakhani') {
      return true;
    } else {
      return false;
    }
  }

  userLogIn() {
    return this.authservice.userLogIn();
  }

  ngOnInit(): void {
    this.getdata();

    this.startPage = 1;
    this.endPage = this.limit;
  }

  getdata() {
    this.alldata = [];
    this.apiService.getdata({}).subscribe((data: any) => {
      this.maindata = data.getalldata;
      this.allpage = this.maindata.length;
      this.maxpage = Math.ceil(this.maindata.length / this.limit)
      this.getpagedata();
    });
  }

  search(value) {
    console.log('value: ', value);
    this.apiService.getSearchData(value).subscribe((data: any) => {
      this.maindata = data.searchData;
      this.allpage = this.maindata.length;
      console.log('maindata: ', this.maindata);
      this.getpagedata();
    });
  }

  deletedata(id: any) {
    console.log('id: ', id);
    this.apiService.deletedata({ id: id }).subscribe((data: any) => { });
    this.getdata();

    setTimeout(() => {
      alert('record deleted successfully');
    }, 1000);
  }

  //****************************** pagination logic ***********************************/
  limit: number = 2;
  pages: number;
  currentPage: number = 1;

  startPage: number;
  endPage: number;
  maxpage: number;

  getpagedata() {
    this.alldata = this.maindata.slice(0, this.limit);
    
  }

  // get page size
  onSelected(event: any) {
    this.limit = event.target.value;
    this.startPage = 1
    this.endPage = this.limit;
    this.getpagedata();
    this.maxpage = Math.ceil(this.maindata.length / this.limit)
    console.log('maxpage: ', this.maxpage);
  }

  // define pages
  numOfPage() {
    let alldata = this.maindata.length / this.limit;
    return alldata;
  }

  getFirstPage() {
    this.alldata = this.maindata.slice(0, this.numOfPage());
    this.changePages(this.currentPage = 1);
  }

  getLastPage() {
    let lPage = Math.ceil(this.maindata.length / this.limit)
    this.alldata = this.maindata.slice(lPage);
    this.changePages((this.currentPage = lPage));
  
  }

  getNextPage() {
    if (this.currentPage < this.numOfPage()) {
      this.currentPage++;
      this.changePages(this.currentPage);
    } 
  }

  getPreviousPage() {
    if (this.currentPage >= 2) {
      this.currentPage--;
      this.changePages(this.currentPage);
      
    } 
  }

  changePages(page: number) {
    // start Page
    if ((Math.ceil((page - 1) * this.limit)) > 1) { 
    this.startPage = Math.ceil((page - 1) * this.limit);
    } else {
      this.startPage = 1;
    }
    // end Page
    if (Math.ceil(page * this.limit) <= this.maindata.length) {
      this.endPage = Math.ceil(page * this.limit);
    } else {
      this.endPage = this.maindata.length
    }
    // if (page < 1) page = 1;
    // if (page > this.numOfPage()) {
    //   page = this.numOfPage();
    // }

    // this.alldata = this.maindata.slice(
    //   (page - 1) * this.limit,
    //   page * this.limit
    // );
    if (this.startPage == 1) {
      this.alldata = this.maindata.slice(0, this.endPage)
    } else {
      this.alldata = this.maindata.slice(this.startPage, this.endPage)
    }
  }
}
