import { Component, OnInit } from '@angular/core';
import { LeftMenuService } from '../../../services/left-menu.service';

@Component({
  selector: 'app-user-charts-list',
  templateUrl: './user-charts-list.component.html',
  styleUrls: ['./user-charts-list.component.css']
})
export class UserChartsListComponent implements OnInit {
  userInfo: any = {};
  groupList = [];
  roomList = [];
  
  constructor(private leftMenuService: LeftMenuService) { 
    for(let i = 0;i<3; i++){
      this.groupList.push(this.roomList);
    }
  }

  ngOnInit() {
   
    let id = sessionStorage.getItem('userId');
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

}
