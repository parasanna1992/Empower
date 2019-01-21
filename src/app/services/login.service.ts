import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: '';
  constructor(private  dataService:  DataService){}
  loginApi(value: any){
    return this.dataService.login("login", value);
  }
  setHeader(token: string, userId: string){
    this.dataService.setHeaders(token, userId);
  }
  
}