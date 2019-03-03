import { Component, OnInit } from '@angular/core';
import { SingleService } from 'src/app/single.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  public arr=[];
  public inpName:String;
  public inpUpdate:string;
  public listIdHidden:String;
  refresh: Subject<any> = new Subject();
  constructor(public singleService:SingleService,public toastr: ToastrService,) {
    
      this.singleService.getAllList().subscribe(
        (apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            this.arr=apiResponse.data;
          } else {
            this.toastr.error(apiResponse.message);
          }
          this.refresh.next();
        },
        (err) => {
          this.toastr.error('Some error occured');
        }
      )
   }
  
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
  public delete:any =(listId)=>{
    this.arr.pop();
    console.log("listId",listId);
    this.singleService.deleteList(listId).subscribe(
      (apiResponse) => {
        console.log(apiResponse);
        if (apiResponse.status === 200) {
          this.toastr.success("ToDo List Deleted Successfully");
        } else {
          this.toastr.error(apiResponse.message);
        }
      },
      (err) => {
        this.toastr.error('Some error occured');
      }
    )
  }

  public editView:any=(data)=>{
    console.log(data);
    $("#insert").hide();
    $("#update").show();
    this.inpUpdate=data.listName;
    this.listIdHidden=data.listId;
  }

  public update:any=()=>{
    if(!this.inpUpdate){
      this.toastr.warning("Enter Edited Field")
    }else{
      let upData={
        listId:this.listIdHidden,
        listName:this.inpUpdate
      }
     this.singleService.updateList(upData).subscribe(
      (apiResponse) => {
        console.log(apiResponse);
        if (apiResponse.status === 200) {
          this.toastr.success("ToDo List Name Updated");
          this.listIdHidden=null;
          this.inpUpdate=null;
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
  ngOnInit() {
  }

}
