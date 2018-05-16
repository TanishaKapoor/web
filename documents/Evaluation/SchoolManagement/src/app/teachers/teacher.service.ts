import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITeacher } from "./teacher";

@Injectable()
export class TeacherService{

     base_url="http://localhost:8080/api/teachers";
    
    constructor(private _http:HttpClient){}

    getTeachers()
    {
        return this._http.get(this.base_url);
    }
    postTeachers(data:ITeacher){
        return this._http.post(this.base_url,data);
    }

}