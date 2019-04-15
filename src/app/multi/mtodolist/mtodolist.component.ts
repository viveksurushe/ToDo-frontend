import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SingleService } from 'src/app/single.service';
import * as $ from 'jquery';
import { MultiService } from 'src/app/multi.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';
@Component({
  selector: 'app-mtodolist',
  templateUrl: './mtodolist.component.html',
  styleUrls: ['./mtodolist.component.css']
})
export class MtodolistComponent implements OnInit {

  public arr=[];
  public inpName:String;
  public inpUpdate:string;
  public listIdHidden:String;
  constructor(public singleService:SingleService,
              public multiService:MultiService,
              public toastr: ToastrService,
              public router:Router,
              private socketService:SocketService) { }

  public add: any = () => {
    if(!this.inpName){
      this.toastr.warning("Enter ToDo List Name");
    }else{
      this.singleService.addToList(this.inpName).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success("ToDo List Added");
            this.socketService.updateList();
            this.inpName=null;
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

  public delete:any =(listId)=>{
    this.singleService.deleteList(listId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.socketService.updateList();
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
          this.socketService.updateList();
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
    this.router.navigate(['mtodo', todo.listId, todo.listName]);
  }//specificTodo end

  undo(){
    this.multiService.undo().subscribe(
      (apiResponse)=>{
        if(apiResponse.status===200){
          console.log(apiResponse);
          this.socketService.updateList();
        }
      }
    );
  }
  ngOnInit() {

    this.socketService.updatedList().subscribe((data)=>{

      this.arr=data;
      
    });

    this.socketService.updateTodo().subscribe(()=>{
      this.ref();
    });
    this.ref();
  }

  private ref(){
    this.multiService.mgetAllList().subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.arr=apiResponse.data;
        }else if(apiResponse.status == 500){
          this.router.navigate['/server-error'];
        } else {
          this.toastr.info(apiResponse.message);
        }
      },
      (err) => {
        this.toastr.error('Some error occured',);
      }
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == 'z' || event.metaKey && event.key == 'z') {//confirming the event occured due to the 'ctrl + Z' or 'cmd + Z' keys.
      alert("it works");

    }
  }//end
}
