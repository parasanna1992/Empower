import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm : FormGroup; 
  responseData: {
    userId:any;
    authToken:any;
  };
  headers = {
    'Content-Type': 'application/json;charset=UTF-8',  
    "Access-Control-Allow-Origin": "*"
}
  status: '';
  invalidCredentials= false;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router : Router){
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }
 
  onSubmit(value){
    
    let oAuthToken: string;
    let userId: string;
    console.log(value);
    this.loginService.loginApi(value).subscribe((response: any)=> {
      if(response.status == 'success'){
      
      oAuthToken = response.data.authToken;
      userId = response.data.userId;
      this.loginService.setHeader(oAuthToken, userId);
      sessionStorage.setItem("OAuthToken", oAuthToken);
      sessionStorage.setItem("userId", userId);
      this.router.navigate(['/dashboard']);
      }   
    }, error => this.invalidCredentials=true)
  }

  hideError(){
    this.invalidCredentials=false;
  }
  ngOnInit() {
  }
  // loginCheck(){
  //   this.router.navigate(['/dashboard']);
  // }
  // forgotPassword(){
  //   this.router.navigate(['/forgot-password']);
  // }
  // signUp(){
  //   this.router.navigate(['/sign-up']);
  // }
  
}
