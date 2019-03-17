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
    console.log(params);
    return this.http.post(`${this.url}/sendReq`,params);
  }
}
