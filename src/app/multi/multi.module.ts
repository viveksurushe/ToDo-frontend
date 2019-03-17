import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MlistviewComponent } from './mlistview/mlistview.component';
import { MtodolistComponent } from './mtodolist/mtodolist.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { ManageFrdComponent } from './manage-frd/manage-frd.component';

@NgModule({
  declarations: [MlistviewComponent, MtodolistComponent, ManageFrdComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    RouterModule.forChild([   
      {path:'mtodolist',component:MtodolistComponent},
      {path:'mtodo/:listId/:listName',component:MlistviewComponent},
      {path:'manage-friend',component:ManageFrdComponent}
    ])
  ]
})
export class MultiModule { }
