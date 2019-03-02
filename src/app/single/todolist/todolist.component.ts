import { Component, OnInit } from '@angular/core';
import { SingleService } from 'src/app/single.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  public arr=[
    {"name":"acd"},
    {"name":"df"}];
  public inpName:String;
  constructor(public singleService:SingleService,public toastr: ToastrService,) { }
  
  public add: any = () => {
    console.log("work",this.inpName);
    if(!this.inpName){
      this.toastr.warning("Enter ToDo List Name");
    }else{
      this.singleService.addToList(this.inpName).subscribe(
        (apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            this.toastr.success("ToDo List Added");
            this.inpName=null;
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        (err) => {
          this.toastr.error('Some error occured');
        }
      )
    } 
    
    
  }
  public delete:any =()=>{
    this.arr.pop();
  }
  ngOnInit() {
  }

}
