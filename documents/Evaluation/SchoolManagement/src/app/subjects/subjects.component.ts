import { Component, OnInit } from '@angular/core';
import { SubjectService } from "./subject.service";
import { ISubject } from "./subject";
import { CourseService } from "../courses/course.service";
import { ICourse } from "../courses/course";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor(private service:SubjectService,
              private courseservice:CourseService) { }

  SubjectList:ISubject[]=[];
  CourseList:ICourse[]=[];
  courseLength:number;
  status:string;
  ngOnInit() {

    this.service.getSubjects()
    .subscribe((event:ISubject[])=>{
      this.SubjectList=event;
    })
    this.courseservice.getCourses()
    .subscribe((event:ICourse[])=>{
      this.CourseList=event;
      this.courseLength=this.CourseList.length;
    })
  }
  send(value,id){
    
    const data:ISubject={
        name:value,
        courseId:id
    }
      this.service.postSubjects(data)
      .subscribe((event)=>{
        console.log(event);
        window.alert("data added");
      })
  }

}
