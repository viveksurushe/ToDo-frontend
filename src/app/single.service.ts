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

  public addTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("listItem",data.listItem)
    console.log(params);
    return this.http.post(`${this.url}/api/v1/single/addTodo`,params);
  }// end of th e signup function

  public getTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data)
    console.log("listid",params);
    return this.http.post(`${this.url}/api/v1/single/getTodo`,params);
  }// end of th e deleteList function

  public deleteTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("listItem",data.item)
    return this.http.post(`${this.url}/api/v1/single/deleteTodo`,params);
  }// end of th e deleteTodo function

  public updateTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("listItem",data.item)
    .set("oldItem",data.oldItem)
    console.log(params);
    return this.http.post(`${this.url}/api/v1/single/updateTodo`,params);
  }// end of th e updateList function

  public done(data):Observable<any>{
    const params=new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("status",data.status)
    console.log(params)
    return this.http.post(`${this.url}/api/v1/single/done`,params);
  }

  //for child elements
  public addChildTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("childItem",data.childItem)
    console.log(params);
    return this.http.post(`${this.url}/api/v1/single/childAdd`,params);
  }// end of the addChildTodo function

  public deleteChild(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("ckey",data.ckey)
    console.log(params);
    return this.http.post(`${this.url}/api/v1/single/childdelete`,params);
  }// end of the deleteChild function

  public updateChild(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("ckey",data.ckey)
    .set("item",data.item)
    console.log("updated",params);
    return this.http.post(`${this.url}/api/v1/single/childupdate`,params);
  }// end of the deleteChild function
}
