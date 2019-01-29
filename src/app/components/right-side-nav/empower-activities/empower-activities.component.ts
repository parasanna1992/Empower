import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { EmpowerService } from 'src/app/services/empower.service';

@Component({
  selector: 'app-empower-activities',
  templateUrl: './empower-activities.component.html',
  styleUrls: ['./empower-activities.component.css']
})
export class EmpowerActivitiesComponent implements OnInit {

  fileDataArray= new Array;
  showFileData = new Array;
  searchField: string;
  fileDetailsArray : Object[];
  fileDetails : any;
  fileUploaderForm: FormGroup;
  searchForm: FormGroup;
  token;
  fileName= null;
  formData= new FormData();
  public files: UploadFile[] = [];
  hideModal=true;
  display= 'none';
  modalClass= 'modal modal_popcontent fade';
  constructor(private empowerService: EmpowerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.fileUploaderForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      permission: ['']
    })
    this.searchForm = this.fb.group({
      searchField: ['', Validators.required]
    })
    //this.searchResult();
    this.empowerService.getAllFileData().subscribe((response: any)=>{
      this.fileDataArray.push(response.entity.records);
      this.extractFileData();
    })
  }

  initPermission(){
    return this.fb.group({
      name:['']
    })
  }


  searchResult(value: string){
    this.showFileData=[];
    this.fileDataArray=[];

    this.empowerService.getFileDataBySearch(value).subscribe((response: any)=>{
      console.log(response);
      
      this.fileDataArray.push(response.entity.records);
      console.log(this.fileDataArray[0].length);
      this.extractFileData();
    })
  }

  extractFileData(){

    for(let i=0; i<=this.fileDataArray.length;i++){
      var fileDataArrayObj = this.fileDataArray[0][i]["attributes"];
      var fileDetails={};
       fileDetails["url"] = 'http://13.126.220.19:8091/'+fileDataArrayObj[2]["value"];
       fileDetails["title"] = fileDataArrayObj[0]["value"];
       //fileDetails["type"] = fileDataArrayObj[4]["value"]; 
       fileDetails["description"] = fileDataArrayObj[4]["value"];
       this.showFileData.push(fileDetails);
       }
       console.log("filedataarray---------------",this.fileDataArray);
         console.log("file details---------------",fileDetails);
      }

      public dropped(event: UploadEvent) {
        this.files = event.files;
        for (const droppedFile of event.files) {
     
          // Is it a file?
          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
     
              // Here you can access the real file
              console.log(droppedFile.relativePath, file);
     
              var permissions = [ 'all'];
              //You could upload it like this:
              const formData = new FormData()
              this.formData.append('file', file, droppedFile.relativePath);
              this.fileName=droppedFile.relativePath;
     
              // Headers
             
              
              
     
            });
          } else {
            // It was a directory (empty directories are added, otherwise only files)
            const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            console.log(droppedFile.relativePath, fileEntry);
          }
        }
      }
     
      public fileOver(event){
        console.log(event);
      }
     
      public fileLeave(event){
        console.log(event);
      }
      openModel(){
        this.display='block';
        this.modalClass = 'modal modal_popcontent fade in';
        this.fileUploaderForm.reset();
        this.fileName=null;
      }
      closeModel(){
        this.display="none";
        this.modalClass = 'modal modal_popcontent fade';
      }
      // onSubmit(formValue){
      
      //   this.formData.append('title',formValue.title);
      //   this.formData.append('description',formValue.description);
      //   this.formData.append('permissions',formValue.permission);
      //   this.formData.append('security' ,'public');
      //   console.log(this.formData);
      //   const headers = new HttpHeaders({
      //     'security-token': 'mytoken'
      //   })
        
      //   this.empowerService.fileUpload(this.formData)
      //         .subscribe(data => {
      //           alert("Successfully Uploaded");
      //           this.closeModel();
      //           this.empowerService.getAllFileData().subscribe((response: any)=>{
      //             this.fileDataArray.push(response.entity.records);
      //             this.extractFileData();
      //           })
      //           // Sanitized logo returned from backend
      //         })
      // }

}
