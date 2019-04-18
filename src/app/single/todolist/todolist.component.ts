import { Component, OnInit } from '@angular/core';
import { SingleService } from 'src/app/single.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
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
  public userName=Cookie.get("firstName")+"  "+Cookie.get("lastName");
  constructor(public singleService:SingleService,public toastr: ToastrService,public router:Router) {
    
   }

   public ref:any=()=>{
    this.singleService.getAllList().subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.arr=apiResponse.data;
        }else if(apiResponse.status == 500){
          this.router.navigate['/server-error'];
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
          }else if(apiResponse.status == 500){
            this.router.navigate['/server-error'];
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
  public delete:any =(listId,index)=>{
    this.singleService.deleteList(listId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.arr.splice(index,1);
          this.ref();
          this.toastr.success("ToDo List Deleted Successfully");
        }else if(apiResponse.status == 500){
          this.router.navigate['/server-error'];
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
        }else if(apiResponse.status == 500){
          this.router.navigate['/server-error'];
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
    this.router.navigate(['stodo', todo.listId, todo.listName]);
  }//specificTodo end
  
  ngOnInit() {

    if(Cookie.get('authtoken')=="" || Cookie.get('authtoken') == null || Cookie.get('authtoken') == undefined){
      this.router.navigate(['/signin']);
    }else{
      if(Cookie.get('role')=='multi'){
        this.router.navigate(['/mtodolist']);
      }
    }

    this.ref();
  }

}
