import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpowerService {

  constructor(private http: HttpClient) { }

  getFileData(searchField: String){
    return this.http.get("http://35.176.94.118:8080/cashapona-empower/search-generic?searchField="+searchField);
  }

  fileUpload(formData: any){
    return this.http.post("http://35.176.94.118:8080/cashapona-empower/empowerItem/populate",formData)
  }

  // saveLabel(formValue: any){
  //   return this.http.post("http://35.176.94.118:8080/cashapona-empower/api/v1/appLabel/save", formValue);
  // }
}