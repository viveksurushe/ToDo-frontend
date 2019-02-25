import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { $ } from 'protractor';
import * as $ from 'jquery';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {


  public email:String;
  public password:any;
  public confirmPassword:any;
  public veriCode:any;

  constructor(public toastr: ToastrService,public UserService: UserService,public router:Router) { }

  sendEmail(){
    if(!this.email){
      this.toastr.warning("Enter Email Address");
    }else if(!this.password){
      this.toastr.warning("Enter Password");
    }else if(!this.confirmPassword){
      this.toastr.warning("Enter Confirm Password");
    }else if(this.password != this.confirmPassword){
      this.toastr.warning("Password don't match");
    }else{
      let data={
        email:this.email,
        userId:Cookie.get("userId")
      }
      console.log("send Mail data",data);
    $("#loading").css({'display':'block'});
    this.UserService.sendVerifiEmail(data)
    // .subscribe((apiResponse) => {
    //     if (apiResponse.status === 200) {
    //       $("#loading").css({'display':'none'});
    //       $("#forgetPassword").css({'display':'none'});
    //       this.toastr.success("Verification Code Send to your Mail");
    //       $("#verificationCode").css({'display':'block'});
    //     } else {
    //       this.toastr.error(apiResponse.message);
    //     }
    //   },
    //   (err) => {
    //     this.toastr.error('Some error occured');
    //   });
    }//if loop end here
  }//send mail fuction end here


  verify(){
    if(!this.veriCode){
      this.toastr.warning("Enter Verification Code");
    }else{
      let data={
        email:this.email
      }
      $("#loading").css({'display':'block'});
      this.UserService.getVerfiCode(data).subscribe(
        (apiResponse) => {
          $("#loading").css({'display':'none'});
          if (apiResponse.status === 200) {
            if(apiResponse.data.verifiCode == this.veriCode){
              this.UserService.updatePassword({email:this.email,password:this.password}).subscribe(
                (apiResponse) => {
                  if (apiResponse.status === 200) {
                    this.toastr.success("Your Password Updated Successfully");
                    setTimeout(() => {
                      this.router.navigate(['/signin'])
                      location.reload();
                    }, 3000);
                  } else {
                    this.toastr.error(apiResponse.message);
                  }
                },
                (err) => {
                  this.toastr.error('Some error occured');
                }
              );
            }else{
              this.toastr.error('Enter Correct Verification Code');
            }
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
