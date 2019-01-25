import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empower-dashboard',
  templateUrl: './empower-dashboard.component.html',
  styleUrls: ['./empower-dashboard.component.css']
})
export class EmpowerDashboardComponent implements OnInit {
  toggleValue=true;
  contentTabWidth="63%";
  toggleTitle(){
    this.toggleValue=!(this.toggleValue);
    if(this.toggleValue==false){
      this.contentTabWidth="98%"
    }else{
      this.contentTabWidth="63%"
    }
   
    console.log("called")
  }
  constructor() { }

  ngOnInit() {
  }

}
