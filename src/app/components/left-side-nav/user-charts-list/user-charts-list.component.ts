import { Component, OnInit } from '@angular/core';
import { LeftMenuService } from '../../../services/left-menu.service';
import { AppStateService } from '../../../services/app-state.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-user-charts-list',
  templateUrl: './user-charts-list.component.html',
  styleUrls: ['./user-charts-list.component.css']
})
export class UserChartsListComponent implements OnInit {
  userInfo: any = {};
  groupList = [];
  roomList = [];
  typeList = [];
  isClassVisible=false;
  constructor(private leftMenuService: LeftMenuService,private router : Router, private appState: AppStateService) { 
    this.typeList = ['Channel', 'Group', 'Direct Message'];
    for(let i = 0;i<3; i++){
      this.groupList.push(this.roomList);
    }
  }

  ngOnInit() {
   
    let id = sessionStorage.getItem('userId');
    //alert(id);
    this.leftMenuService.getUserInfo(id).subscribe((response: any)=>{
      this.userInfo = response.user;
    })
    this.leftMenuService.getGroups().subscribe((response: any)=>{
      this.groupList[1] = response.groups;
    })
    this.leftMenuService.getChannel().subscribe((response: any)=>{
      this.groupList[0] = response.channels;
    })
    this.leftMenuService.getRooms().subscribe((response: any)=>{
      this.groupList[2] = response.ims;
    })
    
  }
  onClickChannel(id: string, type: string, name: string){
    let object: any={};
    object.id = id;
    object.type = type
    if(type=='Direct Message'){
      object.name = name;
    }
  
    this.appState.publish(object);
  }

  logout(){
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }
  styleAdd(){
    this.isClassVisible=true;
  }
  leave(){
    this.isClassVisible=false;
    console.log("called")
  }
}
