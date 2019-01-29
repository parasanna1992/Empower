import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EmpowerService {

  constructor(private http: HttpClient, private dataService: DataService) { }

  getAllFileData(){
    return this.dataService.empowerGet("search-generic?searchString");
  }
  getFileDataBySearch(searchField: String){
    return this.dataService.empowerGet("search-generic?searchString="+searchField);
  }

  fileUpload(formData: any){
    return this.dataService.empowerPost("empowerItem/populate",formData)
  }

  // saveLabel(formValue: any){
  //   return this.http.post("http://35.176.94.118:8080/cashapona-empower/api/v1/appLabel/save", formValue);
  // }
}