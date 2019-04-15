import { Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SingleService } from 'src/app/single.service';
import * as $ from 'jquery';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-mlistview',
  templateUrl: './mlistview.component.html',
  styleUrls: ['./mlistview.component.css']
})
export class MlistviewComponent implements OnInit {
  public json={}
  public newItem:String;
  public listId:String;
  public listName:String;
  public updateItem:String;
  public oldItem:String;
  public updateKey:String;
  public ColdItem:string;
  public id=this.activeRoute.snapshot.paramMap.get('listId'); 
  constructor(
    public singleService:SingleService,
    public toastr: ToastrService,
    public activeRoute:ActivatedRoute,
    private socketService:SocketService,
    private router :Router) { 
    this.ref();
  }

  ref:any=()=>{
    this.singleService.getTodo(this.id).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.json=apiResponse.data.listItem;
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
            this.socketService.listview();
            this.newItem=null;
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

  delete:any=(item)=>{
    let data={
      item:item,
      listId:this.activeRoute.snapshot.paramMap.get('listId')
    }

    this.singleService.deleteTodo(data).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success("ToDo Item Deleted Successfully");
          this.socketService.listview();;
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
          this.socketService.listview();
        }else if(apiResponse.status == 500){
          this.router.navigate['/server-error'];
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
            this.toastr.success("ToDo Item Updated");
            this.socketService.listview();
            $("#insert-item").show();
            $("#update-item").hide();
          } else if(apiResponse.status == 500){
            this.router.navigate['/server-error'];
          }else {
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

  addChild:any=(i)=>{
    this.json[i].show=true;
    $("#insert-child-"+i).toggle();
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
            this.socketService.listview();
          }else if(apiResponse.status == 500){
            this.router.navigate['/server-error'];
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
          this.socketService.listview();
        }else if(apiResponse.status == 500){
          this.router.navigate['/server-error'];
        }else {
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
          this.toastr.success("Child Item Updated Successfully");
          this.socketService.listview();
          $("#update-child-"+i).hide();
          $("#insert-child-"+i).show();
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
  ngOnInit() {
    let urlListId=this.activeRoute.snapshot.paramMap.get('listId');
    let urlListName=this.activeRoute.snapshot.paramMap.get('listName');
    this.listName=urlListName;
    this.listId=urlListId;
    this.socketService.updatelistview().subscribe(
      ()=>{
        this.ref();
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == 'z' || event.metaKey && event.key == 'z') {//confirming the event occured due to the 'ctrl + Z' or 'cmd + Z' keys.
      alert("it works");

    }
  }//end
}
