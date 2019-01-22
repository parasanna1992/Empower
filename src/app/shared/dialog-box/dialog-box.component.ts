import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { UserChatActiveService } from 'src/app/services/user-chat-active.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  searchValue="";
  roomId="GENERAL";
  messagesList = [];
  constructor(private appState: AppStateService,private userChatActiveService: UserChatActiveService) { }
  ngOnInit() {
    this.roomId=sessionStorage.getItem('roomId');
    console.log(this.roomId);
  }
  searchResults(){
  console.log(this.searchValue);
  if(this.roomId){
    this.userChatActiveService.getSearchData(this.roomId,this.searchValue).subscribe((response: any)=>{
      this.messagesList= response.messages;
      console.log(this.messagesList);
      console.log(response);
    })
  }
  else{
    this.userChatActiveService.getSearchData('GENERAL',this.searchValue).subscribe((response: any)=>{
      this.messagesList= response.messages;
      console.log(this.messagesList);
      console.log(response);
    })
  }
  
}
}
