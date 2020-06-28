import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  
  text_query = ''
  constructor(private ds: DataService, private ms: MessageService) { }

  result = []
  htmls  = []
  exec_time = ''
  ngOnInit(): void {
  }

  get_data (tweet_id: number): string{
    let result = ''
    this.ds.getEmbededTweetById(tweet_id).subscribe(
      res => {
        result = res[0]['html'];
        this.htmls.push(result);
      },
      err =>{
        console.log(err);
      }
    );
    return result;
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    twttr.widgets.load();
}

  query (){
    this.htmls = []
    this.ds.getNearestTweets(this.text_query).subscribe(
      res => {
        this.ms.sendMessage("Query succesfully made!");
        this.text_query = '';
        this.result = res[0]['knn']
        this.exec_time = res[0]['duration']
        this.result.forEach(element => {
          let a = element[1]
          this.get_data(a);
        });
        console.log(res);
        
      },
      err => {
        console.log(err)
        this.ms.sendMessage("Error, something is happen!");
      }
    )
  }



}
