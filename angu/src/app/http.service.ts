import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService{

  currentValue = '10';
  currentPage = '0';
  constructor(private http: HttpClient){}
  // tslint:disable-next-line:typedef
  getData(){
    return this.http.get('https://localhost:44395/users?limit=' + this.currentValue + '&page=' + this.currentPage, {responseType: 'json'});
  }
  // tslint:disable-next-line:typedef
  setPage(page: string){
    this.currentPage = page;
  }
  // tslint:disable-next-line:typedef
  setValue(value: string){
    this.currentValue = value;
  }
}
