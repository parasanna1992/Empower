import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  loginCheck(){
    this.router.navigate(['/dashboard']);
  }
  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
  signUp(){
    this.router.navigate(['/sign-up']);
  }
  
}
