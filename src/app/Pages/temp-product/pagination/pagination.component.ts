import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/Services/apiservice.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  limit: any = 5;
  pages: any;
  currentPage: any = 1;

  startPage: any;
  endPage: any;

  alldata: any = [];
  maindata: any = [];
  allpage: any;
  // maindata: any = [];

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
    this.getdata();

    this.startPage = 1;
    this.endPage = this.limit;
  }

  // maindata = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  //   41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  //   60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  //   79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
  //   98, 99, 100,
  // ];

  // data show
  getpagedata() {
    this.pages = this.maindata.slice(0, this.limit);
  }

  getdata() {
    this.maindata = [];
    this.apiService.getdata({}).subscribe((data: any) => {
      this.maindata.push(...data.getmaindata);
      this.allpage = this.maindata.length;
      this.getpagedata();
    });
  }

  // get page size
  onSelected(value: any) {
    this.limit = value;
    this.getpagedata();
  }

  // define pages
  numOfPage() {
    let alldata = this.maindata.length / this.limit;
    return alldata;
  }

  getFirstPage() {
    this.alldata = this.maindata.slice(0, this.numOfPage());
    this.changePages((this.currentPage = 1));
  }

  getLastPage() {
    this.alldata = this.maindata.slice(-2);
    this.changePages((this.currentPage = this.maindata.length / this.limit));
  }

  getNextPage() {
    if (this.currentPage < this.numOfPage()) {
      this.currentPage++;
      this.changePages(this.currentPage);
    }
  }

  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePages(this.currentPage);
    }
  }

  changePages(page) {
    this.startPage = (page - 1) * this.limit;
    this.endPage = page * this.limit;

    if (page < 1) page = 1;
    if (page > this.numOfPage()) {
      page = this.numOfPage();
    }

    this.alldata = this.maindata.slice(
      (page - 1) * this.limit,
      page * this.limit
    );
  }
}
