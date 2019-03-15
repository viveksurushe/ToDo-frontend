import { Component, OnInit } from '@angular/core';
import { SingleService } from 'src/app/single.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Router } from '@angular/router';
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
  constructor(public singleService:SingleService,public toastr: ToastrService,public Router:Router) {
    this.ref();
   }

   public ref:any=()=>{
    this.singleService.getAllList().subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.arr=apiResponse.data;
        } else {
          this.toastr.error(apiResponse.message);
        }
        
      },
      (err) => {
        this.toastr.error('Some error occured');
      }
    )
  }

  public add: any = () => {
    if(!this.inpName){
      this.toastr.warning("Enter ToDo List Name");
    }else{
      this.singleService.addToList(this.inpName).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success("ToDo List Added");
            this.inpName=null;
            this.ref();
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
    this.singleService.deleteList(listId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.ref();
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
        if (apiResponse.status === 200) {
          this.toastr.success("ToDo List Name Updated");
          this.listIdHidden=null;
          this.inpUpdate=null;
          $("#insert").show();
          $("#update").hide();
          this.ref();
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

  specificTodo(todo){
    this.Router.navigate(['stodo', todo.listId, todo.listName]);
  }//specificTodo end
  
  ngOnInit() {
  }

}
