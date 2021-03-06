import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SingleService {

  private token =Cookie.get("authtoken");
  constructor(public http: HttpClient) { }

  public getAllList(): Observable<any>{
    const params=new HttpParams()
    .set("userId",Cookie.get("userId"))
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/getAllList`,params);
  }// end of th e signup function

  public addToList(data): Observable<any>{
    let fullName=Cookie.get("firstName")+" "+Cookie.get("lastName");
    const params = new HttpParams()
    .set("listName",data)
    .set("userId",Cookie.get("userId"))
    .set("addby",fullName)
    // .set("userId",qobj.userId?qobj.userId:'')
    // .set("listId",qobj.listId?qobj.listId:'')
    // .set("listName",qobj.listName?qobj.listName:'')
    // .set("addby",qobj.addby?qobj.addby:'')
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/addlist`,params);
  }// end of th e signup function

  public undoadd(data): Observable<any>{
    const params = new HttpParams()
    .set("listName",data.listName)
    .set("addby",data.addby)
    .set("userId",data.userId)
    .set("listId",data.listId)
    .set("listName",data.listName)
    .set("listItem",data.listItem)
    .set("authToken",this.token)
    console.log("params",params);
    return this.http.post(`${environment.baseUrl}/api/v1/single/undoadd`,params);
  }// end of th e signup function

  public deleteList(id,listName): Observable<any>{
    const params = new HttpParams()
    .set("listId",id)
    .set("listName",listName)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/deleteList`,params);
  }// end of th e deleteList function

  public updateList(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("listName",data.listName)
    .set("oldName",data.oldName)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/updatelist`,params);
  }// end of th e updateList function

  public addTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("listItem",data.listItem)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/addTodo`,params);
  }// end of th e signup function

  public getTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/getTodo`,params);
  }// end of th e deleteList function

  public deleteTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("listItem",data.item)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/deleteTodo`,params);
  }// end of th e deleteTodo function

  public updateTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("listItem",data.item)
    .set("oldItem",data.oldItem)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/updateTodo`,params);
  }// end of th e updateList function

  public done(data):Observable<any>{
    const params=new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("status",data.status)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/done`,params);
  }

  //for child elements
  public addChildTodo(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("childItem",data.childItem)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/childAdd`,params);
  }// end of the addChildTodo function

  public deleteChild(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("ckey",data.ckey)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/childdelete`,params);
  }// end of the deleteChild function

  public updateChild(data): Observable<any>{
    const params = new HttpParams()
    .set("listId",data.listId)
    .set("key",data.key)
    .set("ckey",data.ckey)
    .set("item",data.item)
    .set("authToken",this.token)
    return this.http.post(`${environment.baseUrl}/api/v1/single/childupdate`,params);
  }// end of the deleteChild function
}
