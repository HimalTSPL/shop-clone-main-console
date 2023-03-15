import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor() {}

  month() {
    return [
      {
        id: 0,
        name: 'January',
      },
      {
        id: 1,
        name: 'February',
      },
      {
        id: 2,
        name: 'March',
      },
      {
        id: 3,
        name: 'April',
      },
      {
        id: 4,
        name: 'May',
      },
      {
        id: 5,
        name: 'JUN',
      },
      {
        id: 6,
        name: 'Jully',
      },
      {
        id: 7,
        name: 'Augest',
      },
      {
        id: 8,
        name: 'September',
      },
      {
        id: 9,
        name: 'Octomber',
      },
      {
        id: 10,
        name: 'November',
      },
      {
        id: 11,
        name: 'December',
      },
    ];
  }

  year() {
    let years: any = [];
    for (let i = 1900; i <= 2050; i++) {
      years.push(i);
    }
    return years;
  }
}
