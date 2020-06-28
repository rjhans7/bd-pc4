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
  
  search_options = [
    {
      name: "KNN Sequential (without index)",
      types: [
        {name: "Manhattan Distance", value: "euclidian"},
        {name: "Euclidean Distance", value: "manhattan"}
      ]
    },
    {
      name: "KNN Sequential",
      types: [
        {
          name: "R-Tree indexed", value: "knn-rtree"
        }
      ]
    }

  ]
  distance_function: string = null
  n_neighbours: number = null
  images = [1, 2, 3, 4, 6 ,7]
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

  query(){
    console.log(this.distance_function);
    console.log(this.n_neighbours);
    console.log(this.fileUploadControl);
    if (this.fileUploadControl.size){
      this.ds.queryFile(this.fileUploadControl.value, this.n_neighbours, this.distance_function).subscribe(
        res => {
          console.log(res);
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
