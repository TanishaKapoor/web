
import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { ISubject } from "./subject";

@Injectable()
export class SubjectService
{
    base_url="http://localhost:8080/api/subjects";
    constructor(private _http:HttpClient){}
    getSubjects()
    {
        return this._http.get(this.base_url);
    }
    postSubjects(data:ISubject)
    {
        return this._http.post(this.base_url,data);
    }
}