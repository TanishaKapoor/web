import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICourse } from "./course";

@Injectable()
export class CourseService {
    base_url="http://localhost:8080/api/courses"

    constructor(private httP:HttpClient){}

    getCourses()
    {
        return this.httP.get(this.base_url);
    }
    postCourse(value:ICourse)
    {
        return this.httP.post(this.base_url,value);
    }
    getbatches(index)
    {
        return this.httP.get(this.base_url+"/"+(index)+"/batches")
    }
    getlectures(index1,index2)
    {
        return this.httP.get(this.base_url+"/"+(index1)+"/batches"+"/"+(index2)+"/lectures")
    }
    getStudent(index1,index2)
    {
        return this.httP.get(this.base_url+"/"+(index1)+"/batches"+"/"+(index2)+"/students")
    }
}