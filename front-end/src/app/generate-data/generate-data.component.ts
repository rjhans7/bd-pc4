import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-generate-data',
  templateUrl: './generate-data.component.html',
  styleUrls: ['./generate-data.component.css']
})
export class GenerateDataComponent implements OnInit {

  constructor(private ds: DataService, private ms: MessageService) { }

  n_tweets = 0;

  ngOnInit(): void {
  }

  generate(){
    if (this.n_tweets > 0){
      this.ds.generateNewTweets(this.n_tweets).subscribe(
        res => {
          this.ms.sendMessage("Tweets succesfully generated!");
          this.ds.downloadNewTweetFile(res[0]['path']);
          this.ds.generateInvertedIndex(1000, 100);
        },
        err => {
          console.log (err);
          this.ms.sendMessage("Error generating new tweets!");
        }
      )
    }else{
      this.ms.sendMessage("Please, enter a valid number!");
    }

  }

}
