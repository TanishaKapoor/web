import { Component, OnInit } from '@angular/core';
import { StudentService } from "./student.service";
import { IStudent } from "./student";
import { BatchService } from "../batches/batch.service";
import { IBatch } from "../batches/batch";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentId2: number;
  totalBatches: number;

  pageTitle:string='Students List'
  constructor(private service:StudentService,
              private batchservice:BatchService) { }
  StudentList:IStudent[]=[];
  Batches:IBatch[]=[];
  wantbatch:boolean=false;
  studentId:number;

  ngOnInit() {
    this.service.getStudents()
    .subscribe((event:IStudent[])=>{
      this.StudentList=event
    })
    this.batchservice.getBatches()
    .subscribe((event:IBatch[])=>{
      this.Batches=event;
      this.totalBatches=this.Batches.length;
    })
  }
  send(value)
  {
    const data:IStudent={
      name:value
    }
    this.service.postStudent(data)
    .subscribe((event)=>{
      console.log(event);
      window.alert("data added");
    })
  }
  toggle(ind)
  {
    this.wantbatch=true
    this.studentId=ind;
    this.studentId2=ind+1;
  }
  addtobatch(index)
  {
    const data={
      sid:this.studentId2,
      bid:parseInt(index)
    }
    this.service.postStudentBatch(data)
    .subscribe((event)=>{
      console.log(event);
      window.alert("data added");
    })


  }

}
