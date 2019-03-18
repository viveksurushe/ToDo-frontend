import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-mlistview',
  templateUrl: './mlistview.component.html',
  styleUrls: ['./mlistview.component.css']
})
export class MlistviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == 'z' || event.metaKey && event.key == 'z') {//confirming the event occured due to the 'ctrl + Z' or 'cmd + Z' keys.
      alert("it works");

    }
  }//end
}
