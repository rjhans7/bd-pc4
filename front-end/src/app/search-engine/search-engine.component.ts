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
  ];

  /*Query*/
  distance_function: string = null;
  n_neighbours: number = null;
  server_path: string = null;

  /*Result*/
  tested_image_path : string = null;
  nearest_images_paths = [];

  public fileUploadControl = new FileUploadControl(FileUploadValidators.filesLimit(1));

  constructor(private ds: DataService, private ms: MessageService) { }


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
    if (this.fileUploadControl.size){
      this.tested_image_path = null;
      this.nearest_images_paths = [];
      
      /* KNN without index */
      if (this.distance_function === "euclidian" || this.distance_function === "manhattan"){
        console.log("Calling KNN without index ...");
        this.ds.knnQueryFile(this.fileUploadControl.value, this.n_neighbours, this.distance_function).subscribe(
          res => {
            console.log(res);
            this.tested_image_path = res['path'];
            this.nearest_images_paths = res['neighbors'];
            this.ms.sendMessage("File succesfully uploaded!");
            this.fileUploadControl.clear();
          },
          err => {
            console.log (err);
            this.ms.sendMessage("Error while uploading!");
          }
        )
      }else if (this.distance_function === "knn-rtree" ){
        console.log("Calling KNN R-Tree ...");
        this.ds.rtreeQueryFile(this.fileUploadControl.value, this.n_neighbours).subscribe(
          res => {
            console.log(res);
            this.tested_image_path = res['path'];
            this.nearest_images_paths = res['neighbors'];
            this.ms.sendMessage("File succesfully uploaded!");
            this.fileUploadControl.clear();
          },
          err => {
            console.log (err);
            this.ms.sendMessage("Error while uploading!");
          }
        )
      }

    }else{
      this.ms.sendMessage("Please choose an image!")
    }
  }

  fullPath(relativePath: string){
    if (relativePath){
      return this.ds.getServerPath(relativePath);
    }
    return null;
  }

}
