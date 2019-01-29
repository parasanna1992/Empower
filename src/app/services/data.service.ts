import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  oauthToken: string
  baseUrl: string;
  empowerUrl: string;
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
    this.empowerUrl = environment.host1
  }

  setHeaders(oauthToken:string, userId: string){
    this.oauthToken = oauthToken;
    this.httpOptions = {
      headers: new HttpHeaders({
       "Content-type" : "application/json",
       "X-Auth-Token": oauthToken,
       "X-User-Id": userId
      })
    };
  }
                                
  get(contextUrl : string){

    // console.log(this.baseUrl+contextUrl);
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
    // console.log(this.baseUrl+contextUrl);
    return this.http.put(this.baseUrl + contextUrl, this.httpOptions);
  }
  empowerPost(contextUrl: string, postData: any){
    return this.http.post(this.empowerUrl + contextUrl, postData);
  }
  empowerGet(contextUrl : string){
    return this.http.get(this.empowerUrl+ contextUrl);
  }

}
