import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router"
import {HttpClientModule} from "@angular/common/http"


import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';
import { BatchesComponent } from './batches/batches.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CourseService } from "./courses/course.service";
import { StudentService } from "./students/student.service";
import { SubjectService } from "./subjects/subject.service";
import { TeacherService } from "./teachers/teacher.service";
import { BatchService } from "./batches/batch.service";



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    StudentsComponent,
    SubjectsComponent,
    TeachersComponent,
    BatchesComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"courses",component:CoursesComponent},
      {path:"students",component:StudentsComponent},
      {path:"subjects",component:SubjectsComponent},
      {path:"teachers",component:TeachersComponent},
      {path:"batches",component:BatchesComponent},
      {path:"welcome",component:WelcomeComponent},
      {path:" ",redirectTo:"welcome",pathMatch:"full"},
      {path:"**",redirectTo:"welcome",pathMatch:"full"}
    ])
  ],
  providers: [CourseService,StudentService,SubjectService,TeacherService,BatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
