import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:5000/productList';

  // add data
  savedata(payload: any) {
    return this.http.post(this.url, payload);
  }

  //get data
  getdata(payload: any) {
    return this.http.get(this.url, payload);
  }

  // search data
  getSearchData(payload: any) {
    console.log('payload: ', payload);
    return this.http.get(this.url + '/' + payload, payload);
  }

  // delete data
  deletedata(payload: any) {
    return this.http.delete(this.url + '/' + payload.id, payload);
  }

  // update data by id
  updatedata(payload: any) {
    return this.http.put(this.url + '/' + payload._id, payload);
  }

  // for geting data which is update
  getupdatedata(payload: any) {
    return this.http.get(this.url + '/search/' + payload, payload);
  }
}

