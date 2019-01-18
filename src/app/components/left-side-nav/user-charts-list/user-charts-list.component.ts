import { Component, OnInit } from '@angular/core';
import { LeftMenuService } from '../../../services/left-menu.service';

@Component({
  selector: 'app-user-charts-list',
  templateUrl: './user-charts-list.component.html',
  styleUrls: ['./user-charts-list.component.css']
})
export class UserChartsListComponent implements OnInit {

  constructor(private leftMenuService: LeftMenuService) { }

  ngOnInit() {
    let id = sessionStorage.getItem('userId');
    this.leftMenuService.getAllRooms(id).subscribe((response: any)=>{
      alert(JSON.stringify(response))
    })
    
  }

}
