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



}
