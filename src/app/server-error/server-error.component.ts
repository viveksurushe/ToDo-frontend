import { Component, OnInit } from '@angular/core';
import * as $ from  'jquery';
@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function(){
      $('body').removeClass('loading');
    }, 1000);
  }

}
