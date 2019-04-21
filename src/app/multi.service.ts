import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class MultiService {

  private url = 'http://localhost:4000/api/v1/multi';
  public token =Cookie.get("authtoken");
  constructor(public http: HttpClient) { }

  public frdReq():Observable<any>{
    return this.http.get(`${this.url}/frdReq?authToken=${this.token}`);
  }

  // public frdList():Observable<any>{
  //   return this.http.get(`${this.url}/frdList`);
  // }

  public sendReq(data):Observable<any>{
    const params =new HttpParams()
    .set("userId1",data.current)
    .set("userName1",data.currentName)
    .set("userId2",data.userid2)
    .set("userName2",data.userName2)
    .set("authToken",this.token)
    return this.http.post(`${this.url}/sendReq`,params);
  }

  public cancelReq(data):Observable<any>{
    const params =new HttpParams()
    .set("id",data)
    .set("authToken",this.token)
    return this.http.post(`${this.url}/cancelReq`,params);
  }

  public undo():Observable<any>{
    return this.http.get(`${this.url}/undo`);
  }

  public undoDelete(id):Observable<any>{
    console.log(id);
    return this.http.get(`${this.url}/undoDelete?id=${id}`);
  }
  public mgetAllList(): Observable<any>{
    const params=new HttpParams()
    .set("userId1",Cookie.get("userId"))
    .set("authToken",this.token)
    return this.http.post(`${this.url}/mgetAllList`,params);
  }// end of th e signup function

  public accept(data):Observable<any>{
    const params = new HttpParams()
    .set("userId1",data.userId1)
    .set("userId2",data.userId2)
    .set("userName1",data.userName1)
    .set("userName2",data.userName2)
    .set("authToken",this.token)
    return this.http.post(`${this.url}/acceptReq`,params);
  }

  public unfriend(data):Observable<any>{
    const params= new HttpParams()
    .set("userId1",data.userId1)
    .set("userId2",data.userId2)
    .set("authToken",this.token)
    return this.http.post(`${this.url}/unfriend`,params);
  }
}
  
