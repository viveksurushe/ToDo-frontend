import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class SingleService {

  private url = 'http://localhost:4000';
  constructor(public http: HttpClient) { }

  public addToList(data): Observable<any>{
    const params = new HttpParams()
    .set("listName",data)
    .set("userId",Cookie.get("userId"))
    console.log(params);
    return this.http.post(`${this.url}/api/v1/single/addlist`,params);
  }// end of th e signup function
}
