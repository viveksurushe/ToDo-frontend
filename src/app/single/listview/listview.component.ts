import { Component, OnInit } from '@angular/core';
import { SingleService } from 'src/app/single.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  public json={
    "make pay":["one","two"],
    "hello":"wer"
  }
  public newItem:String;
  constructor(public singleService:SingleService,public toastr: ToastrService) { }

  add:any=()=>{
    if(!this.newItem){
      this.toastr.warning("Enter Item");
    }else{
      console.log("add called",this.newItem);
    }
    
  }

  delete:any=()=>{
    console.log("delete called");
  }

  update:any=()=>{
    console.log("update called");
  }

  updateView:any=()=>{
    $("#insert-item").hide();
    $("#update-item").show();
  }
  ngOnInit() {
  }

}
