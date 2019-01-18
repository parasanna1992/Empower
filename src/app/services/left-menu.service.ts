import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  constructor(private dataService: DataService) { }

  getAllRooms(id: string){
    return this.dataService.get('users.info?userId='+id)
  }
}
