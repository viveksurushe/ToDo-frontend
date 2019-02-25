import { Component } from '@angular/core';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo-frontend';
  public islogin=false;
  constructor(public UserService:UserService,private toastr: ToastrService, public router: Router){}

  public logout: any = () => {

    this.UserService.logout()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          Cookie.delete('authtoken');
          Cookie.delete('firstName');
          Cookie.delete('lastName');
          Cookie.delete('role');
          Cookie.delete('userId');
          Cookie.delete('email');
        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')
      });

  } // end logout

  ngOnInit() {
    let authtoken=Cookie.get("authtoken");
    if(authtoken == null){
      this.islogin=false;
    }
    if(authtoken){
      this.islogin=true;
    }
  }

}
