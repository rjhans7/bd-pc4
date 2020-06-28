import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent {
  
  text_query = ''
  selected = ''
  public fileUploadControl = new FileUploadControl(FileUploadValidators.filesLimit(1));

  constructor(private ds: DataService, private ms: MessageService) {}


  upload(){
    if (this.fileUploadControl.size){
      this.ds.addFile(this.fileUploadControl.value).subscribe(
        res => {
          this.ms.sendMessage("File succesfully uploaded!");
          this.fileUploadControl.clear();
        },
        err => {
          console.log (err);
          this.ms.sendMessage("Error while uploading!");
        }
      )
    }else{
      this.ms.sendMessage("Please choose an image!")
    }
  }





}
