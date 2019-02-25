import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  public email: String;
  public password: any;

  constructor(public toastr: ToastrService,
    public UserService: UserService,
    public Router: Router) { }

  public signinFunction: any = () => {
      if (!this.email) {
        this.toastr.warning('Enter Correct Email Id');
      } else if (!this.password) {
        this.toastr.warning('Enter password');
      } else {
        let signinData = {
          email: this.email,
          password: this.password
        }
        console.log(signinData);
        this.UserService.signinFunction(signinData).subscribe(
          (apiResponse) => {
            console.log("apires=>>",apiResponse);
            if (apiResponse.status === 200) {
              // Cookie.set('authtoken', apiResponse.data.authToken);//it is jwt token
              // Cookie.set('userId', apiResponse.data.userDetails.userId);
              // Cookie.set('firstName', apiResponse.data.userDetails.firstName);
              // Cookie.set('lastName',apiResponse.data.userDetails.lastName);
              // Cookie.set('role', apiResponse.data.userDetails.role);
              // Cookie.set('email', apiResponse.data.userDetails.email);
              // this.appService.setUserInfoToLocalStorage(apiResponse.data.userDetails);
              // location.reload();
              // if (apiResponse.data.userDetails.role == "Admin") {
              //   this.Router.navigate(['/aDashboard']);
              // } else {
              //   this.Router.navigate(['/mDashboard']);
              // }
            } else {
              this.toastr.error(apiResponse.message);
            }
          },
          (err) => {
            this.toastr.error(err);
          }
        )
      }
  }
  ngOnInit() {
  }

}
