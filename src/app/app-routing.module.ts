import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ListAdvisoryComponent } from './component/advisory/list-advisory/list-advisory.component';
import { AddAdvisoryComponent } from './component/advisory/add-advisory/add-advisory.component';
import { EditAdvisoryComponent } from './component/advisory/edit-advisory/edit-advisory.component';
import { ListStudentComponent } from './component/student/list-student/list-student.component';
import { AddStudentComponent } from './component/student/add-student/add-student.component';
import { EditStudentComponent } from './component/student/edit-student/edit-student.component';
import { ListTeacherComponent } from './component/teacher/list-teacher/list-teacher.component';
import { AddTeacherComponent } from './component/teacher/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './component/teacher/edit-teacher/edit-teacher.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'header',component:HeaderComponent,children:[
    { path: 'students/edit/:id', component: EditStudentComponent },
    { path: 'students', component: ListStudentComponent },
    { path: 'students/new', component: AddStudentComponent },
    { path: 'advisories', component: ListAdvisoryComponent },
    { path: 'advisories/new', component: AddAdvisoryComponent },
    { path: 'advisories/edit/:id', component: EditAdvisoryComponent },  
    { path: 'teachers', component: ListTeacherComponent },
    { path: 'teachers/new', component: AddTeacherComponent },
    { path: 'teachers/edit/:id', component: EditTeacherComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
