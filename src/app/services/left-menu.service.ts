import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  constructor(private dataService: DataService) { }

  getUserInfo(id: string){
    return this.dataService.get('users.info?userId='+id)
  }
  getGroups(){
    return this.dataService.get('groups.list');
  }
  getChannel(){
    return this.dataService.get('channels.list.joined');
  }
  getRooms(){
    return this.dataService.get('im.list');
  }
  getChatHistory(){
    
  }
  
}
