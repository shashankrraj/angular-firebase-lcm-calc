import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';

export const firebaseConfig = {
  apiKey: "AIzaSyD_zDakAB7eUD3pEhiN6U_v_rndqdYXF7Y",
  authDomain: "firecalc-ebf11.firebaseapp.com",
  databaseURL: "https://firecalc-ebf11.firebaseio.com",
  projectId: "firecalc-ebf11",
  storageBucket: "firecalc-ebf11.appspot.com",
  messagingSenderId: "893308552913"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
