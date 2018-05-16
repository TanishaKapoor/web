import { Component, OnInit } from '@angular/core';
import { CourseService } from "./course.service";
import { ICourse } from "./course";
import { IBatch } from "../batches/batch";
import { ILecture } from "./lecture";
import { IStudent } from "../students/student";
import { BatchService } from "../batches/batch.service";
import { TeacherService } from "../teachers/teacher.service";
import { ITeacher } from "../teachers/teacher";
import { StudentService } from "../students/student.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  

  CourseList:ICourse[]=[];
  Teachers:ITeacher[]=[];
  CourseRelatedbatches:IBatch[]=[];
  RelatedLectures:ILecture[]=[];
  RelatedStudent:IStudent[]=[];
  ISIndex:boolean=false;
  Islecture:boolean=false;
  ISStudent:boolean=false;
  totalteachers:number;
  coursenumber:number;
  batchnumber:number;
  message:string;
  comingStudent:IStudent[]=[];
  newid:number;

  constructor(private service:CourseService,
              private batchService:BatchService,
            private teacherservice:TeacherService,
            private studentService:StudentService) { }



  ngOnInit() {
    this.service.getCourses()
    .subscribe((event:ICourse[])=>{
      this.CourseList=event;
    })
    this.teacherservice.getTeachers()
    .subscribe((event:ITeacher[])=>{
      this.Teachers=event;
      this.totalteachers=this.Teachers.length;
    })
  }
  send(value)
  {
    const data:ICourse={
      name:value
    }
    this.service.postCourse(data)
    .subscribe((event)=>{
      console.log(event);
      window.alert("data added");
    })
  }
  details(index)
  {
    this.ISIndex=true;
    this.coursenumber=parseInt(index)+1;
    this.service.getbatches(index+1)
    .subscribe((event:IBatch[])=>{
      this.CourseRelatedbatches=event;
    })
  }
  lecture(ind)
  {
   
    this.Islecture=true;
    this.batchnumber=parseInt(ind)+1;
    this.service.getlectures(this.coursenumber,this.batchnumber)
    .subscribe((event:ILecture[])=>{
      this.RelatedLectures=event;
    })

  }
  student(ind)
  {
   
    this.ISStudent=true;
    this.batchnumber=parseInt(ind)+1;
    this.service.getStudent(this.coursenumber,ind+1)
    .subscribe((event:IStudent[])=>{
      this.RelatedStudent=event;
    })

  }
  data:IBatch;
  batchadd(value)
  {
     this.data={
      name:value,
      courseId:this.coursenumber
      
    }
    this.batchService.postBatches(this.data)
    .subscribe((event)=>{
      console.log(event);
      window.alert("data added");
    })
   
   

  }
  addlecture(value,index)
  {
    const data:ILecture={
      name:value,
      batchId:this.batchnumber,
      teacherId:parseInt(index)
    }
    this.batchService.postLecture(data)
    .subscribe((event)=>{
      console.log(event);
      window.alert("data added");
    })
     
  }
  addStudent(value)
  {
    const data:IStudent={
      name:value
    }
    this.studentService.postStudent(data)
    .subscribe((event)=>{
      console.log(event);
    })
    this.studentService.getStudents()
    .subscribe((event:IStudent[])=>{
      this.comingStudent=event;
      this.newid=this.comingStudent.length;
      console.log(this.newid);
      this.addsb();
    })
  }
  addsb()
  {
     const data2={
      sid:this.comingStudent.length,
      bid:this.batchnumber
    }
    console.log(data2);
    this.studentService.postStudentBatch(data2)
    .subscribe((event)=>{
      console.log(event);
      window.alert("data added");
    })
  }

}
