import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddStudentComponent } from './component/student/add-student/add-student.component';
import { EditStudentComponent } from './component/student/edit-student/edit-student.component';
import { ListStudentComponent } from './component/student/list-student/list-student.component';
import { ToolbarComponent } from './component/toolbar/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './component/shared/angular-material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ListAdvisoryComponent } from './component/advisory/list-advisory/list-advisory.component';
import { AddAdvisoryComponent } from './component/advisory/add-advisory/add-advisory.component';
import { EditAdvisoryComponent } from './component/advisory/edit-advisory/edit-advisory.component';
import { ListTeacherComponent } from './component/teacher/list-teacher/list-teacher.component';
import { AddTeacherComponent } from './component/teacher/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './component/teacher/edit-teacher/edit-teacher.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    ListStudentComponent,
    ToolbarComponent,
    NavbarComponent,
    ListAdvisoryComponent,
    AddAdvisoryComponent,
    EditAdvisoryComponent,
    ListTeacherComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
