import { Component } from '@angular/core';
import {Directive, HostListener} from "@angular/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleValue=true;
  contentTabWidth="70%";
  toggleTitle(){
    this.toggleValue=!(this.toggleValue);
    if(this.toggleValue==false){
      this.contentTabWidth="98%"
    }else{
      this.contentTabWidth="70%"
    }
   
    console.log("called")
  }
}