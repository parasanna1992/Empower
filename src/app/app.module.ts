import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserChartsListComponent } from './components/left-side-nav/user-charts-list/user-charts-list.component';
import { UserChatActiveComponent } from './components/chat-content/user-chat-active/user-chat-active.component';
import { EmpowerActivitiesComponent } from './components/right-side-nav/empower-activities/empower-activities.component';

@NgModule({
  declarations: [
    AppComponent,
    UserChartsListComponent,
    UserChatActiveComponent,
    EmpowerActivitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
