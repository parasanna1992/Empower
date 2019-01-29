import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { UploadEvent, FileSystemFileEntry, UploadFile, FileSystemDirectoryEntry } from '../../../../node_modules/ngx-file-drop';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { EmpowerService } from '../../services/empower.service';
import { HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { UserChatActiveService } from '../../services/user-chat-active.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-empower-modal-pop-up',
  templateUrl: './empower-modal-pop-up.component.html',
  styleUrls: ['./empower-modal-pop-up.component.css']
})
export class EmpowerModalPopUpComponent implements OnInit {
  public files: UploadFile[] = [];
  fileName= null;
  formData= new FormData();
  fileUploaderForm: FormGroup;
  messageObject: any = {
    message: {
      rid: '',
      attachment: [
        {messageLink:''}
      ]
    }
  }
  constructor(public dialogRef: MatDialogRef<EmpowerModalPopUpComponent>, private empowerService: EmpowerService, private userChatService: UserChatActiveService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private toastr: ToastrService) { 
      
      this.fileUploaderForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        permission: ['']
      })
    }
    

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
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
  onSubmit(formValue){
      
    this.formData.append('title',formValue.title);
    this.formData.append('description',formValue.description);
    this.formData.append('permissions',formValue.permission);
    this.formData.append('security' ,'public');
    console.log(this.formData);
    const headers = new HttpHeaders({
      'security-token': 'mytoken'
    })
    
    this.empowerService.fileUpload(this.formData)
          .subscribe(data => {
            this.toastr.success('Successfully Updated');
            this.messageObject.rid = this.data.id;
            this.dialogRef.close();
            //this.messageObject.attachment[0].messageLink = 
            
            // this.userChatService.sendMessage(this.messageObject).subscribe((response: any)=>{

            // })
            
            // Sanitized logo returned from backend
          })
  }

}
