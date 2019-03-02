import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

// form module
import { FormsModule } from '@angular/forms';

//Modules
import { UserModule } from './user/user.module';

//toastr
import { ToastrModule } from 'ngx-toastr';

//Components
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ForgetComponent } from './forget/forget.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { SigninComponent } from './user/signin/signin.component';
import { SingleModule } from './single/single.module';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    ForgetComponent,
    ErrorViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    SingleModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'about',component:AboutComponent},
      {path:'contact',component:ContactComponent},
      {path:'forget',component:ForgetComponent},
      {path:'signin',component:SigninComponent,pathMatch:'full'},
      {path:'',redirectTo:'signin',pathMatch:'full'},
      {path:'*',component:ErrorViewComponent},
      {path:'**',component:ErrorViewComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
