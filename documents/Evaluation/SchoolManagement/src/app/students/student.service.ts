import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { IStudent } from "./student";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class StudentService{

    base_url="http://localhost:8080/api/students";
    case_url=" http://localhost:8080/api/studentBatch"
    
    constructor(private _http:HttpClient){}

    getStudents()
    {
        return this._http.get(this.base_url);
    }
    postStudent(value:IStudent)
    {
        return this._http.post(this.base_url,value);
    }
   postStudentBatch(data)
   {
       return this._http.post(this.case_url,data);
   }
    
}