import { Component } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent {
  
  constructor(private ds: DataService, private ms: MessageService) { }
  public fileUploadControl = new FileUploadControl(FileUploadValidators.filesLimit(2));

  upload(){
    if (this.fileUploadControl.size){
      this.ds.addFiles(this.fileUploadControl.value).subscribe(
        res => {
          this.ms.sendMessage("File succesfully uploaded!");
          this.fileUploadControl.clear();
          this.ds.generateInvertedIndex(1000, 100);
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
