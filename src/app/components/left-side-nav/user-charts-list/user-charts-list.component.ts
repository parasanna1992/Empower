import { Component, OnInit } from '@angular/core';
import { LeftMenuService } from '../../../services/left-menu.service';
import { AppStateService } from '../../../services/app-state.service';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserChatActiveService } from 'src/app/services/user-chat-active.service';
import { ToastrService } from 'ngx-toastr';
import { group } from '@angular/animations';
export interface User {
  name: string;
}
@Component({
  selector: 'app-user-charts-list',
  templateUrl: './user-charts-list.component.html',
  styleUrls: ['./user-charts-list.component.css']
})
export class UserChartsListComponent implements OnInit {
  loginForm : FormGroup;
  members: FormArray;
  step = 0;
  member=[];

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
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  filteredOptions: Observable<string[]>;
  flightSrcFilteredOptions: Observable<string[]>;
  searchUser: any = [];
  userInfo: any = {};
  users: any= [];
  groupList = [];
  roomList = [];
  typeList = [];
  isClassVisible=false;
  test: any;
  hideModal=true;
  display= 'none';
  userDisplay='none';
  modalClass= 'modal modal_popcontent fade';
  myControl = new FormControl();
  invalidCredentials= false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
 constructor(private toastr: ToastrService,private fb: FormBuilder,private leftMenuService: LeftMenuService,private router : Router, private appState: AppStateService,private userChatActiveService: UserChatActiveService) { 
  this.loginForm = this.fb.group({
    name:['', Validators.required],
    members: ['']
    // this.fb.array([""])
  })
  this.typeList = ['Channel', 'Group', 'Direct Message'];
    for(let i = 0;i<3; i++){
      this.groupList.push(this.roomList);
    }
  }
  get f() { return this.loginForm.controls; }
  onSubmit(value){
    // console.log(value);
     value.members=[];
     value.members=this.member;
    // console.log(value);
     this.leftMenuService.createChannel(value).subscribe((response: any)=> {
     this.closeModel();
     this.toastr.success('Successfully Channel Created');
     this.loginForm.reset()
     this.leftMenuService.getChannel().subscribe((response: any)=>{
      this.groupList[0] = response.channels;
     //this.searchUser.push(response.channels);
      for(let item of this.groupList[0]){
        this.searchUser.push(item);
      }
    })
   })
  }
  onItemSelect(item: any) {
   // console.log('onItemSelect', item);
    this.member.push(item.username);
  //  console.log(this.member)
}
onSelectAll(items: any) {
  //  console.log('onSelectAll', items);
    for(let item of items){
      this.member.push(item.username);
    //  console.log('list--->'+JSON.stringify(this.member))
    }
}
toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}
  hideError(){
    this.invalidCredentials=false;
  }
  eventHandler(event) {
   // console.log(event, event.keyCode, event.keyIdentifier);
    this.userDisplay="none";
    if(event.keyCode==64){
      this.userDisplay="block";
  this.userChatActiveService.getUsers().subscribe((response: any)=>{
    this.users=response.users;
  //  console.log( this.users);
  })
    }
 } 
  ngOnInit() {
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    let id = sessionStorage.getItem('userId');
    //alert(id);
    this.leftMenuService.getUserInfo(id).subscribe((response: any)=>{
      this.userInfo = response.user;
    })
    this.leftMenuService.getGroups().subscribe((response: any)=>{
      this.groupList[1] = response.groups;
    //  console.log('RRAY--->'+JSON.stringify(this.groupList[1]))
      for(let item of this.groupList[1]){
        this.searchUser.push(item);
       // console.log('list--->'+JSON.stringify(this.searchUser))
      }
      
      //console.log('hi'+JSON.stringify(this.searchUser))
      //this.searchUser.push(response.groups);
     // console.log(this.groupList[1])
    })
    this.userChatActiveService.getUsers().subscribe((response: any)=>{
      this.test=response.users;
      this.users=this.test;
    //  console.log(this.users)
      for(let item of this.test){
        this.searchUser.push(item);
      }
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
      //   this.searchUser.push(item.names[1]);
      // }
      console.log( this.groupList[2])
    })
}
autoPopulate(){
  this.flightSrcFilteredOptions = this.myControl.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filter(value))
  );
}
selected(option:any){
  let object: any={};
  object=option;
 // console.log("selected"+object);
  this. onClickChannel(object.id,object.type,object.usersCount)
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
    

  onClickChannel(id: string, type: string, count: string){
    sessionStorage.removeItem('roomId');
    let object: any={};
    object.id = id;
    object.type = type;
    object.count = count;
    if(type=='Direct Message'){
      object.name = name;
    }
    this.appState.publish(object);
   sessionStorage.setItem('roomId',object.id);
  }
  onClickChannel1(id: string, type: string, name: string){
    sessionStorage.removeItem('roomId');
    sessionStorage.removeItem('usersCount');
    let object: any={};
    object.id = id;
    object.type = type;
    object.name = name;
  
    this.appState.publish(object);
   sessionStorage.setItem('roomId',object.id);
  }
  directTest(group:any){
    let object:any={};
    object.id=group._id;
    object.type='Direct Message';
    object.name=group.usernames[1];
    this.onClickChannel1(object.id,object.type,object.name);
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
  openModel(){
    this.display='block';
    this.modalClass = 'modal modal_popcontent fade in';
   // this.fileUploaderForm.reset();
  //  this.fileName=null;
  }
  closeModel(){
    this.display="none";
    this.modalClass = 'modal modal_popcontent fade';
  }
}
