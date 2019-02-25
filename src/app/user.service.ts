import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:4000';

  constructor(public http: HttpClient) { }

  public setUserInfoToLocalStorage(data){
    localStorage.setItem('userInfo', JSON.stringify(data));
  }//setUserInfo end here

  public getUserInfoFromLocalStorage(){
    return JSON.parse(localStorage.getItem('userInfo'));
  }//end of the GetUserINfo fron local storage


  public signupFunction(data): Observable<any>{
    const params = new HttpParams()
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    .set("email",data.email) 
    .set("countyCode",data.countyCode) 
    .set("phone",data.phone)
    .set("role",data.role)
    .set("password",data.password);
    console.log(params);
    return this.http.post(`${this.url}/api/v1/users/signup`,params);
  }// end of th e signup function
  
  public signinFunction(data):Observable<any>{
    const params = new HttpParams()
    .set("email",data.email)
    .set("password",data.password);
    console.log(params);
    return this.http.post(`${this.url}/api/v1/users/login`,params);
  }//login function end here

  public logout(): Observable<any> {
    const params = new HttpParams()
    .set('userId', Cookie.get('userId'))
    return this.http.post(`${this.url}/api/v1/users/logout`, params);
  } // end logout function

  public getAuthToken():Observable<any>{
    const params = new HttpParams()
    .set('userId', Cookie.get('userId'));
    return this.http.post(`${this.url}/api/v1/users/auth`,params);
  }

  public sendVerifiEmail(data): Observable<any>{
    const params=new HttpParams()
    .set("email",data.email)
    return this.http.post(`${this.url}/api/v1/users/sendVeriCode`,params);
  }//end of sendVerifiEmail 

  public getVerfiCode(data): Observable<any>{
    const params=new HttpParams()
    .set("email",data.email)
    return this.http.post(`${this.url}/api/v1/users/getCode`,params);
  }//end of getVerfiCode Function

  public updatePassword(data): Observable<any>{
    const params=new HttpParams()
    .set("email",data.email)
    .set("password",data.password)
    return this.http.post(`${this.url}/api/v1/users/updatePass`,params);
  }//end of updatePassword Function

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    } // end condition *if
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }  // END handleError

}//End of Class
