import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserChartsListComponent } from './components/left-side-nav/user-charts-list/user-charts-list.component';
import { UserChatActiveComponent } from './components/chat-content/user-chat-active/user-chat-active.component';
import { EmpowerActivitiesComponent } from './components/right-side-nav/empower-activities/empower-activities.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { EmpowerDashboardComponent } from './components/dashboard/empower-dashboard/empower-dashboard.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    UserChartsListComponent,
    UserChatActiveComponent,
    EmpowerActivitiesComponent,
    LoginPageComponent,
    EmpowerDashboardComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
