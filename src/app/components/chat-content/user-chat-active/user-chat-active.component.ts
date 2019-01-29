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
  titleMenu: any={};
  defaultGeneral="GENERAL"
  messageObject: any = {
    message: {}
  };
  chatId: string;
  messageForm: FormGroup;
  constructor(public dialog: MatDialog,private appState: AppStateService, private userChatActiveService: UserChatActiveService,
  private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      rid: '',
      msg:'',
    })
  
   }
  test: any;
  

  ngOnInit() {
    this.elementRef.nativeElement.focus();
    this.id = sessionStorage.getItem('userId');
    this.titleMenu.name="general";
    this.userChatActiveService.getChannelHistory(this.defaultGeneral).subscribe((response: any)=>{
      console.log(JSON.stringify(response))
      this.messagesList = response.messages.sort((a: any, b: any) =>
      new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
     
  );
      
    }) 
    this.userChatActiveService.getUsers().subscribe((response: any)=>{
      this.test=response.users;
       console.log("hai"+JSON.stringify(this.test))
    }) 

    this.appState.event.subscribe((data: any) => {
      this.chatId = data.id
      this.messageForm.patchValue({
        rid: data.id
      });
      if(data.type=='Channel'){
        this.userChatActiveService.getChannelInfo(data.id).subscribe((response: any)=>{
          this.titleMenu.name = response.channel.name;
        
        this.userChatActiveService.getChannelHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
          
        }) 
      })
      this.elementRef.nativeElement.focus();
      }
      if(data.type=='Group'){
        this.userChatActiveService.getGroupInfo(data.id).subscribe((response: any)=>{
          this.titleMenu.name = response.group.name;
        this.messageForm.patchValue({
            channel: this.titleMenu.name
        });
        this.userChatActiveService.getGroupHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
          
        }) 
      })
      this.elementRef.nativeElement.focus();
      }
      if(data.type=='Direct Message'){
        this.titleMenu.name = data.name[1];
        // console.log(data.name[1]);
        this.userChatActiveService.getDirectMessageHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
          
        }) 
        this.elementRef.nativeElement.focus();
      }

       
    });
  }
  onSubmit(value: any){
    this.messageObject.message = value;
    console.log(JSON.stringify(this.messageObject))
    this.userChatActiveService.sendMessage(this.messageObject).subscribe((response: any)=>{

    })
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
}
