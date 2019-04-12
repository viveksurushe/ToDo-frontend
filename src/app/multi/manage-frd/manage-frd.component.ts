import { Component, OnInit, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MultiService } from 'src/app/multi.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-manage-frd',
  templateUrl: './manage-frd.component.html',
  styleUrls: ['./manage-frd.component.css']
})
export class ManageFrdComponent implements OnInit {

  public friendList:any=[];
  public sendList:any;
  public requests:any=[];
  public canReq:any=[];
  public currentUserId=Cookie.get('userId');
  public fullName=Cookie.get('firstName')+" "+Cookie.get('lastName');
  constructor(public toastr: ToastrService,
    public UserService: UserService,
    public MultiService:MultiService,
    private socketService:SocketService) {
    this.ref();
  }
    public ref(){
        this.UserService.getmember().subscribe(
          (apiResponse)=>{
              if(apiResponse.status == 200){
                  this.sendList=apiResponse.data;
              }else{
                  this.toastr.error(apiResponse.message);
              }
          },
          (err)=>{
                this.toastr.error("Some Error Occured");
          }
        );
        this.MultiService.frdReq().subscribe(
          (apiResponse)=>{
            if(apiResponse.status == 200){
                for(let item of apiResponse.data){
                  if(item.userId2 == this.currentUserId && item.accept == false && item.send == true){
                    for(let val in this.sendList){
                      if(this.sendList[val].userId == item.userId1){
                        this.sendList.splice(val,1);
                      }
                    }
                    this.requests.push(item);
                  }else if(item.userId1 == this.currentUserId && item.accept == false && item.send == true){
                    for(let val in this.sendList){
                      if(this.sendList[val].userId == item.userId2){
                        this.sendList.splice(val,1);
                      }
                    }
                    this.canReq.push(item);
                  }

                  if(item.userId2 == this.currentUserId && item.accept == true && item.send == true){
                    this.friendList.push(item);
                    for(let val in this.sendList){
                      if(this.sendList[val].userId == item.userId1){
                        this.sendList.splice(val,1);
                      }
                    }
                  }
                }
            }else{
              this.toastr.error(apiResponse.message);
            }
          },
          (err)=>{
              this.toastr.error("Some Error Occured");
          }
        );
    }
  
  public sendReq(item){
    let fullName2=item.firstName+" "+item.lastName;
    let data={
      current:this.currentUserId,
      currentName:this.fullName,
      userid2:item.userId,
      userName2:fullName2
    }
    this.MultiService.sendReq(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status == 200){
          this.socketService.frdlist();
          this.toastr.info("Request send SuccessFully");
        }else{
          this.toastr.warning(apiResponse.message);
        }
      },
      (err)=>{
        this.toastr.error("Some Error Occured");
      }
    );
  }

  public acceptReq(item){

    this.MultiService.accept(item).subscribe(
      (apiResponse)=>{
        if(apiResponse.status == 200){
          this.socketService.frdlist();
          this.socketService.todolist();
          this.toastr.info("Request Accepted SuccessFully");
        }else{
          this.toastr.warning(apiResponse.message);
        }
      },
      (err)=>{
        this.toastr.error("Some Error Occured");
      }
    );
  }

  public cancelReq(item){
   
    this.MultiService.cancelReq(item).subscribe(
      (apiResponse)=>{
        if(apiResponse.status == 200){
          this.socketService.frdlist();
          this.toastr.info("Request Cancel SuccessFully");
        }else{
          this.toastr.warning(apiResponse.message);
        }
      },
      (err)=>{
        this.toastr.error("Some Error Occured");
      }
    );
  }

  public Unfriend(item){

    this.MultiService.unfriend(item).subscribe(
      (apiResponse)=>{
        if(apiResponse.status == 200){
          this.socketService.frdlist();
          this.socketService.todolist();
          this.toastr.info("Unfriend SuccessFully");
        }else{
          this.toastr.warning(apiResponse.message);
        }
      },
      (err)=>{
        this.toastr.error("Some Error Occured");
      }
    );
  }

  ngOnInit() {
    this.socketService.updatedFrd().subscribe(()=>{ 
      this.requests=[];
      this.canReq=[];
      this.friendList=[];
      this.ref();     
    });
  }

}
