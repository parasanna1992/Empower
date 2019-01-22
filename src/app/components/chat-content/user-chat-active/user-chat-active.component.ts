import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../services/app-state.service';
import { UserChatActiveService } from '../../../services/user-chat-active.service';

@Component({
  selector: 'app-user-chat-active',
  templateUrl: './user-chat-active.component.html',
  styleUrls: ['./user-chat-active.component.css']
})
export class UserChatActiveComponent implements OnInit {
  messagesList = [];
  messagesSenderList = [];
  messagesReceiverList = [];
  id;
  titleMenu: any={};
  defaultGeneral="GENERAL"
  constructor(private appState: AppStateService, private userChatActiveService: UserChatActiveService) { }
  

  ngOnInit() {
    
    this.id = sessionStorage.getItem('userId');
    this.titleMenu.name="general";
    this.userChatActiveService.getChannelHistory(this.defaultGeneral).subscribe((response: any)=>{
      this.messagesList = response.messages.sort((a: any, b: any) =>
      new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
     
  );
      
    }) 
    this.appState.event.subscribe((data: any) => {
      if(data.type=='Channel'){
        this.userChatActiveService.getChannelInfo(data.id).subscribe((response: any)=>{
          this.titleMenu.name = response.channel.name;
        
        this.userChatActiveService.getChannelHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
          
        }) 
      })
      }
      if(data.type=='Group'){
        this.userChatActiveService.getGroupInfo(data.id).subscribe((response: any)=>{
          this.titleMenu.name = response.group.name;
        this.userChatActiveService.getGroupHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
          
        }) 
      })
      }
      if(data.type=='Direct Message'){
        this.titleMenu.name = data.name;
        alert(data.name)
        this.userChatActiveService.getDirectMessageHistory(data.id).subscribe((response: any)=>{
          this.messagesList = response.messages.sort((a: any, b: any) =>
          new Date(a._updatedAt).getTime() - new Date(b._updatedAt).getTime()
      );
          
        }) 
      }

       
    });
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

}
