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

  public getAllList(): Observable<any>{
    return this.http.get(`${this.url}/api/v1/single/getAllList`);
  }// end of th e signup function

  public addToList(data): Observable<any>{
    const params = new HttpParams()
    .set("listName",data)
    .set("userId",Cookie.get("userId"))
    console.log(params);
    return this.http.post(`${this.url}/api/v1/single/addlist`,params);
  }// end of th e signup function

  public deleteList(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data)
    return this.http.post(`${this.url}/api/v1/single/deleteList`,params);
  }// end of th e deleteList function

  public updateList(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("listName",data.listName)
    console.log(params);
    return this.http.post(`${this.url}/api/v1/single/updatelist`,params);
  }// end of th e updateList function
}
