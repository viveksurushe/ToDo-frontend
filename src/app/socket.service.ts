import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url='http://localhost:4000';
  private socket;
  
  constructor(private http:HttpClient) { 

    this.socket=io(this.url);

  }

  //events to be listened

  public updatedList = () => {

    return Observable.create((observer)=>{

      this.socket.on('updatedList',(data)=>{

        // console.log("-->",data);
        observer.next(data);

      })//end socket

    })//end observable
  }

  public updatedFrd = () =>{

    return Observable.create((observer)=>{

      this.socket.on('updatedFrd',(data)=>{

        //console.log("-->",data);
        observer.next(data);

      })//end socket

    })//end observable
  }

  public updateTodo = () =>{

    return Observable.create((observer)=>{

      this.socket.on('updated-todolist',(data)=>{

        observer.next(data);

      })//end socket

    })//end observable
  }

  public updatelistview = () =>{

    return Observable.create((observer)=>{

      this.socket.on('updated-listview',(data)=>{

        observer.next(data);

      })//end socket

    })//end observable
  }

  // //events to be emited
  
  public updateList = () => {

    this.socket.emit('updateList',Cookie.get('userId'));

  }

  public frdlist = () =>{

    this.socket.emit('updateFrd');

  }

  public todolist = () =>{

    this.socket.emit('update-todolist');

  }

  public listview = () =>{

    this.socket.emit('update-listview');

  }
}
