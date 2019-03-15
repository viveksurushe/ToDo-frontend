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
  public updateKey:String;
  public ColdItem:string;
  public id=this.activeRoute.snapshot.paramMap.get('listId'); 
  constructor(public singleService:SingleService,public toastr: ToastrService,public activeRoute:ActivatedRoute) {
    this.ref();
  }

  ref:any=()=>{
    this.singleService.getTodo(this.id).subscribe(
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

  delete:any=(item)=>{
    let data={
      item:item,
      listId:this.activeRoute.snapshot.paramMap.get('listId')
    }

    this.singleService.deleteTodo(data).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success("ToDo Item Deleted Successfully");
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

  done:any=(item)=>{
    let data={
      listId:this.activeRoute.snapshot.paramMap.get('listId'),
      key:item.key,
      status:"close"
    }
    this.singleService.done(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status == 200){
          this.toastr.success("Done");
          this.ref();
        }else{
          this.toastr.error(apiResponse.message);
        }  
      },
      (err)=>{
        this.toastr.error("Some Error Occured");
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
        key:this.updateKey,
        listId:this.activeRoute.snapshot.paramMap.get('listId')
      }
      this.singleService.updateTodo(data).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.ref();
            this.toastr.success("ToDo Item Updated");
            $("#insert-item").show();
            $("#update-item").hide();
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

  updateView:any=(item,key)=>{
    $("#insert-item").hide();
    $("#update-item").show();
    this.updateItem=item;
    this.oldItem=item;
    this.updateKey=key;
  }

  //for childe elements
  childAdd:any=(key)=>{
    if(!$("#childItem-"+key).val()){
      this.toastr.warning("Enter Child Item of "+(key+1));
    }else{
      let data={
        listId:this.listId,
        key:key,
        childItem:$("#childItem-"+key).val()
      }
      this.singleService.addChildTodo(data).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success("ToDo Item Added");
            this.ref();
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        (err) => {
          this.toastr.error('Some error occured');
        }
      );
    }
  }

  updateChildView:any=(i,ci,Citem)=>{
    $("#insert-child-"+i).hide();
    $("#update-child-"+i).show();
    $("#updateCItem-"+i).val(Citem);
    this.ColdItem=ci;
  }

  deleteChild:any=(i,ci)=>{
    let data={
      listId:this.listId,
      key:i,
      ckey:ci
    }
    this.singleService.deleteChild(data).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success("Child Item Deleted Successfully");
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

  updateChild:any=(i)=>{
    let data={
      listId:this.listId,
      key:i,
      ckey:this.ColdItem,
      item:$("#updateCItem-"+i).val()
    }

    this.singleService.updateChild(data).subscribe(
      (apiResponse) => {;
        if (apiResponse.status === 200) {
          this.ref();
          this.toastr.success("Child Item Updated Successfully");
          $("#update-child-"+i).hide();
          $("#insert-child-"+i).show();
        } else {
          this.toastr.error(apiResponse.message);
        }
      },
      (err) => {
        this.toastr.error('Some error occured');
      }
    )
  }

  ngOnInit() {
    let urlListId=this.activeRoute.snapshot.paramMap.get('listId');
    let urlListName=this.activeRoute.snapshot.paramMap.get('listName');
    this.listName=urlListName;
    this.listId=urlListId;
  }

}
