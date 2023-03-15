import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from 'src/app/Services/calendar.service';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  years: any = [];
  month: any = [];
  selectMonths: any;
  selectYears: any;
  currentMonth: number = 0;
  currentYear: number = 1900;
  constructor(private calendar: CalendarService) {}

  selecteditem: any;
  ngOnInit(): void {
     console.log('avg: ', this.avg);
    this.selectMonths = document.getElementById('month');
    this.selectYears = document.getElementById('year');
    this.years = this.calendar.year();

    this.month = this.calendar.month();
  }

  selectMonth(s) {
    console.log(s.target.value);
  }

  selectYear(s) {
    console.log(s.target.value);
  }

  nextMonth() {
    if (this.currentMonth < 11) {
      this.currentMonth += 1;
    } else if (this.currentMonth == 11) {
      this.currentYear += 1;
      this.currentMonth = 0;
      console.log('this.currentYear: ', this.currentYear);
    }
    this.selectYears.value = this.currentYear;
    this.selectMonths.value = this.currentMonth;
  }

  perviousMonth() {
    if (this.currentMonth > 0) {
      this.currentMonth -= 1;
    } else if (this.currentMonth == 0) {
      this.currentYear -= 1;
      this.currentMonth = 11;
      console.log('this.currentYear: ', this.currentYear);
    }
    this.selectYears.value = this.currentYear;
    this.selectMonths.value = this.currentMonth;
  }
  a = [
  {name:"brijesh", age: 21 , em: '' },
  {name:"jigarbhai", age: 24 , em: '' },
  {name:"niravbhai", age: 32 , em: '' },
  {name:"jay", age: 19 , em: '' },
  {name:"kartik", age: 20 , em: '' },
  {name:"jvin", age: 20 , em: '' },
  {name:"jimi", age: 20 , em: '' },
  {name:"chirag", age: 18 , em: '' },
  {name:"kishanhai", age: 24 , em: '' },
  ]

  avg = this.a.map(a => a.age>20 ? a : 'null')
  
  
}
