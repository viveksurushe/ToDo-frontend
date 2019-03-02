import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from './todolist/todolist.component';
import { ListviewComponent } from './listview/listview.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TodolistComponent, ListviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    RouterModule.forChild([   
      {path:'stodolist',component:TodolistComponent},
    ])
  ]
})
export class SingleModule { }
