import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileDropModule } from 'ngx-file-drop';
import { AngularFileUploaderModule } from "angular-file-uploader";
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { AutoGrowDirective } from './directives/auto-grow.directive';
import { EmpowerModalPopUpComponent } from './shared/empower-modal-pop-up/empower-modal-pop-up.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart'
@NgModule({
  declarations: [
    AppComponent,
    UserChartsListComponent,
    UserChatActiveComponent,
    EmpowerActivitiesComponent,
    LoginPageComponent,
    EmpowerDashboardComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DialogBoxComponent,
    AutoGrowDirective,
    EmpowerModalPopUpComponent
  ],
  
  imports: [
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    FileDropModule,
    AngularFileUploaderModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    PickerModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents:[
    DialogBoxComponent,
    EmpowerModalPopUpComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
