import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  oauthToken: string
  baseUrl: string;
  authUrl: string;
  authUrlLogout:string;
  httpOptions: any ={}
  loginHeader: any = {
    'Content-Type': 'application/json;charset=UTF-8',  
    "Access-Control-Allow-Origin": "*"
  }
  constructor(private http: HttpClient) { 
    this.setHeaders(sessionStorage.getItem("OAuthToken"), sessionStorage.getItem("userId"));
    this.baseUrl= environment.host;
  }

  setHeaders(oauthToken:string, userId: string){
    this.oauthToken = oauthToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        "Auth-Token": oauthToken,
        "User-Id": userId,
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
        "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
        "Content-type" : "application/json"
      })
    };
  }
                                
  get(contextUrl : string){
    console.log(this.baseUrl+contextUrl);
    return this.http.get(this.baseUrl+ contextUrl , this.httpOptions);
  }
  login(contextUrl: string, postData: any)
  { 
    return this.http.post(this.baseUrl + contextUrl, postData, this.loginHeader);
  }

  post(contextUrl: string, postData: any)
  { 
    return this.http.post(this.baseUrl + contextUrl, postData, this.httpOptions);
  }

  put(contextUrl: string, postData: any){ 
    return this.http.put(this.baseUrl + contextUrl, postData, this.httpOptions);
  }

  delete(contextUrl: string){ 
    console.log(this.baseUrl+contextUrl);
    return this.http.put(this.baseUrl + contextUrl, this.httpOptions);
  }

}
