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
  constructor(private appState: AppStateService, private userChatActiveService: UserChatActiveService) { }
  

  ngOnInit() {
    this.id = sessionStorage.getItem('userId');
    this.appState.event.subscribe((data: string) => {
      this.userChatActiveService.getChannelHistory(data).subscribe((response: any)=>{
        this.messagesList = response.messages;
        this.messagesSenderList = this.messagesList.filter(x=> x.u._id!=this.id);
        this.messagesReceiverList = this.messagesList.filter(x=> x.u._id==this.id);
      })  
    });
  }

}
