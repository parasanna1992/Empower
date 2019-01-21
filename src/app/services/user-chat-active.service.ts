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
}
