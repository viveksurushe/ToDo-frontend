import { Component, OnInit } from '@angular/core';
import { SingleService } from 'src/app/single.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  public json={
    // "make pay":["one","two"],
    // "hello":"wer"
  }
  public newItem:String;
  public listId:String;
  public listName:String;
  public updateItem:String;
  public oldItem:String;
  constructor(public singleService:SingleService,public toastr: ToastrService,public activeRoute:ActivatedRoute) {
    let id=this.activeRoute.snapshot.paramMap.get('listId'); 
    this.singleService.getTodo(id).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.json=apiResponse.data.listItem;
        } else {
          this.toastr.error(apiResponse.message);
        }
      },
      (err) => {
        this.toastr.error('Some error occured');
      }
    )

  }

  add:any=()=>{
    if(!this.newItem){
      this.toastr.warning("Enter Item");
    }else{
      let data={
        listId:this.listId,
        listItem:this.newItem
      }
      this.singleService.addTodo(data).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success("ToDo Item Added");
            this.newItem=null;
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

  delete:any=(item)=>{
    let data={
      item:item,
      listId:this.activeRoute.snapshot.paramMap.get('listId')
    }
    delete this.json[item];
    this.singleService.deleteTodo(data).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success("ToDo Item Deleted Successfully");
        } else {
          this.toastr.error(apiResponse.message);
        }
      },
      (err) => {
        this.toastr.error('Some error occured');
      }
    )
  }

  update:any=()=>{
    if(!this.updateItem){
      this.toastr.warning("Enter Edited Item");
    }else{
      let data={
        item:this.updateItem,
        oldItem:this.oldItem,
        listId:this.activeRoute.snapshot.paramMap.get('listId')
      }
      this.singleService.updateTodo(data).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success("ToDo Item Updated");
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        (err) => {
          this.toastr.error('Some error occured');
        }
      )
      this.oldItem=null;
    }
    
  }

  updateView:any=(item)=>{
    $("#insert-item").hide();
    $("#update-item").show();
    this.updateItem=item;
    this.oldItem=item;
  }
  ngOnInit() {
    let urlListId=this.activeRoute.snapshot.paramMap.get('listId');
    let urlListName=this.activeRoute.snapshot.paramMap.get('listName');
    this.listName=urlListName;
    this.listId=urlListId;
  }

}
