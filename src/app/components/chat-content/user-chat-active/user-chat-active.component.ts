import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppStateService } from '../../../services/app-state.service';
import { UserChatActiveService } from '../../../services/user-chat-active.service';
import {Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogBoxComponent } from 'src/app/shared/dialog-box/dialog-box.component';
import { EmpowerModalPopUpComponent } from '../../../shared/empower-modal-pop-up/empower-modal-pop-up.component';
import { FormGroup, FormBuilder } from '../../../../../node_modules/@angular/forms';
@Component({
  selector: 'app-user-chat-active',
  templateUrl: './user-chat-active.component.html',
  styleUrls: ['./user-chat-active.component.css']
})

export class UserChatActiveComponent implements OnInit {
  @ViewChild('typeIt') private elementRef: ElementRef;
  messagesList = [];
  messagesSenderList = [];
  messagesReceiverList = [];
  id;
  users: any= [];
  titleMenu: any={};
  defaultGeneral="GENERAL"
  messageObject: any = {
    message: {}
  };
  chatId: string;
  userDisplay='none';
  messageForm: FormGroup;
  messageCount: any;
  usersCount: string;
  participantsValue=true;
  appendUser: string;
  textMessage: any;
  constructor(public dialog: MatDialog,private appState: AppStateService, private userChatActiveService: UserChatActiveService,
  private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      rid: '',
      msg:'',
    })
  
   }
  test: any;
  

  ngOnInit() {
    this.usersCount=sessionStorage.getItem('usersCount');
    this.elementRef.nativeElement.focus();
    this.id = sessionStorage.getItem('userId');
    this.titleMenu.name="general";
    this.userChatActiveService.getChannelHistory(this.defaultGeneral).subscribe((response: any)=>{
      console.log(JSON.stringify(response))
      this.messagesList = response.messages.sort((a: any, b: any) =>
      new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
     
  );
    this.messageCount=this.messagesList.length;
    }) 
    this.userChatActiveService.getUsers().subscribe((response: any)=>{
      this.test=response.users;
      // console.log("hai"+JSON.stringify(this.test))
    }) 

    this.appState.event.subscribe((data: any) => {
      this.usersCount=data.count;
      this.chatId = data.id
      this.messageForm.patchValue({
        rid: data.id
      });
      if(data.type=='Channel'){
        this.participantsValue=true;
        this.userChatActiveService.getChannelInfo(data.id).subscribe((response: any)=>{
          this.titleMenu.name = response.channel.name;
        
        this.userChatActiveService.getChannelHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
          this.messageCount=this.messagesList.length;
        }) 
      })
      this.elementRef.nativeElement.focus();
      }
      if(data.type=='Group'){
        this.participantsValue=true;
        this.userChatActiveService.getGroupInfo(data.id).subscribe((response: any)=>{
          this.titleMenu.name = response.group.name;
        this.messageForm.patchValue({
            channel: this.titleMenu.name
        });
        this.userChatActiveService.getGroupHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
      this.messageCount=this.messagesList.length;
        }) 
      })
      this.elementRef.nativeElement.focus();
      }
      if(data.type=='Direct Message'){
        this.participantsValue=false;
        this.titleMenu.name = data.name;
        // console.log(data.name[1]);
        this.userChatActiveService.getDirectMessageHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
      this.messageCount=this.messagesList.length;
        }) 
        this.elementRef.nativeElement.focus();
      }

       
    });
  }
  show =false;
  showEmoji(){
    this.show=!(this.show);
  }
  appendEmoji:string;
  selectedEmoji(value:any){
    console.log(value.emoji.colons);
    this.appendEmoji=value.emoji.colons;
    this.textMessage=this.messageForm.get('msg').value;
    this.textMessage=this.textMessage+this.appendEmoji;
    this.messageForm.get('msg').setValue(this.textMessage);
    this.elementRef.nativeElement.focus();
  }
  onSubmit(value: any){
    this.messageObject.message = value;
    console.log(JSON.stringify(this.messageObject))
    this.userChatActiveService.sendMessage(this.messageObject).subscribe((response: any)=>{

    })
  }
  userSelect(group:any){
    console.log(group);
    this.appendUser=group.name;
    //this.textMessage=  this.messageForm.set('msg')
    this.textMessage=this.messageForm.get('msg').value;
    this.textMessage=this.textMessage+this.appendUser;
    this.messageForm.get('msg').setValue(this.textMessage);
    console.log(this.textMessage);
    this.userDisplay="none";
    this.elementRef.nativeElement.focus();
  }
 
  returnChatCss(id){
    let rightChatCss= 'message_block msg_left';
    let leftChatCss= 'message_block msg_right';

    if(id==this.id){
      return leftChatCss;
    }
    else{
      return rightChatCss;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '600px',
      width: '400px',
    });
  }
  openEmpowerDialog(){
    const dialogRef = this.dialog.open(EmpowerModalPopUpComponent, {
      height: '600px',
      width: '650px',
      data: {id: this.chatId}
    });
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
}
