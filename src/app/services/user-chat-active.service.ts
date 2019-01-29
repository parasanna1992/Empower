import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserChatActiveService {

  constructor(private dataService: DataService) { }
  getChannelHistory(id: any){
    return this.dataService.get('channels.history?roomId='+id);
  }
  getGroupHistory(id: any){
    return this.dataService.get('groups.messages?roomId='+id);
  }
  getDirectMessageHistory(id: any){
    return this.dataService.get('im.history?roomId='+id);
  }
  getChannelInfo(id: any){
    return this.dataService.get('channels.info?roomId='+id);
  }
  getGroupInfo(id: any){
    return this.dataService.get('groups.info?roomId='+id);
  }
  getSearchData(id: any,searchText:string){
    return this.dataService.get('chat.search?roomId='+id+'&searchText='+searchText);
  }
  getUsers(){
    return this.dataService.get('users.list');
  }
 
}
