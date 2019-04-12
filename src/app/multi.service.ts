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
  constructor(public http: HttpClient) { }

  public frdReq():Observable<any>{
    return this.http.get(`${this.url}/frdReq`);
  }

  public frdList():Observable<any>{
    return this.http.get(`${this.url}/frdList`);
  }

  public sendReq(data):Observable<any>{
    const params =new HttpParams()
    .set("userId1",data.current)
    .set("userName1",data.currentName)
    .set("userId2",data.userid2)
    .set("userName2",data.userName2)
    console.log("==>",params);
    return this.http.post(`${this.url}/sendReq`,params);
  }

  public cancelReq(data):Observable<any>{
    const params =new HttpParams()
    .set("id",data)
    console.log(params);
    return this.http.post(`${this.url}/cancelReq`,params);
  }

  public undo():Observable<any>{
    return this.http.get(`${this.url}/undo`);
  }

  public mgetAllList(): Observable<any>{
    const params=new HttpParams()
    .set("userId1",Cookie.get("userId"));
    console.log(params);
    return this.http.post(`${this.url}/mgetAllList`,params);
  }// end of th e signup function

  public accept(data):Observable<any>{
    const params = new HttpParams()
    .set("userId1",data.userId1)
    .set("userId2",data.userId2)
    .set("userName1",data.userName1)
    .set("userName2",data.userName2)
    return this.http.post(`${this.url}/acceptReq`,params);
  }

  public unfriend(data):Observable<any>{
    const params= new HttpParams()
    .set("userId1",data.userId1)
    .set("userId2",data.userId2)
    console.log(params);
    return this.http.post(`${this.url}/unfriend`,params);
  }
}
  
