import { Component, OnInit } from '@angular/core';
import { LeftMenuService } from '../../../services/left-menu.service';
import { AppStateService } from '../../../services/app-state.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserChatActiveService } from 'src/app/services/user-chat-active.service';
export interface User {
  name: string;
}
@Component({
  selector: 'app-user-charts-list',
  templateUrl: './user-charts-list.component.html',
  styleUrls: ['./user-charts-list.component.css']
})
export class UserChartsListComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<string[]>;
  searchUser: any = [];
  userInfo: any = {};
  groupList = [];
  roomList = [];
  typeList = [];
  isClassVisible=false;
  test: any;
  myControl;
 constructor(private leftMenuService: LeftMenuService,private router : Router, private appState: AppStateService,private userChatActiveService: UserChatActiveService) { 
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
      console.log('RRAY--->'+JSON.stringify(this.groupList[1]))
      for(let item of this.groupList[1]){
        this.searchUser.push(item);
        console.log('list--->'+JSON.stringify(this.searchUser))
      }
      
      //console.log('hi'+JSON.stringify(this.searchUser))
      //this.searchUser.push(response.groups);
     // console.log(this.groupList[1])
    })
    this.userChatActiveService.getUsers().subscribe((response: any)=>{
      // this.test=response.users;
      // for(let item of this.test){
      //   this.searchUser.push(item);
      // }
    }) 
    this.leftMenuService.getChannel().subscribe((response: any)=>{
      this.groupList[0] = response.channels;
     //this.searchUser.push(response.channels);
      for(let item of this.groupList[0]){
        this.searchUser.push(item);
      }
    })
    this.leftMenuService.getRooms().subscribe((response: any)=>{
      this.groupList[2] = response.ims;
     // this.searchUser.push(response.ims);
      // for(let item of this.groupList[2]){
      //   this.searchUser.push(item.usernames[1]);
      // }
      // console.log(this.searchUser)
    })
}
getAutoSearch(){
  //console.log(JSON.stringify(this.searchUser))
  this.filteredOptions = this.searchUser
  this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
}
private _filter(value): string[] {

  const filterValue = value.toLowerCase();

  return this.searchUser.filter(option =>option.name.toLowerCase().includes(filterValue));
}
    

  onClickChannel(id: string, type: string, name: string){
    sessionStorage.removeItem('roomId');
    let object: any={};
    object.id = id;
    object.type = type
    if(type=='Direct Message'){
      object.name = name;
    }
  
    this.appState.publish(object);
   sessionStorage.setItem('roomId',object.id);
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
    // console.log("called")
  }
}
