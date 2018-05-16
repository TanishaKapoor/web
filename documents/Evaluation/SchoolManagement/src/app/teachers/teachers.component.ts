import { Component, OnInit } from '@angular/core';
import { TeacherService } from "./teacher.service";
import { ITeacher } from "./teacher";
import { SubjectService } from "../subjects/subject.service";
import { ISubject } from "../subjects/subject";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private service:TeacherService,
              private subjectservice:SubjectService) { }

  TeacherList:ITeacher[]=[];
  SubejctList:ISubject[]=[];
  subjectLength:number;
  ngOnInit() {
    this.service.getTeachers()
    .subscribe((event:ITeacher[])=>{
      this.TeacherList=event;
    })
    this.subjectservice.getSubjects()
    .subscribe((event:ISubject[])=>{
      this.SubejctList=event;
      this.subjectLength=this.SubejctList.length;
    })
  }
  send(value,id)
  {
    const data:ITeacher={
      name:value,
      subjectId:id
    }
    this.service.postTeachers(data)
    .subscribe((event)=>{
      console.log(event);
      window.alert("data added");
    })
  }

}
