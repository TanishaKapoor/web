import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class BatchService
{
    base_url="http://localhost:8080/api/batches";
    base_url_lecture="http://localhost:8080/api/lectures"

    constructor(private _http:HttpClient){}

    getBatches()
    {
        return this._http.get(this.base_url);
    }
    postBatches(data)
    {
        return this._http.post(this.base_url,data)
    }
    postLecture(data)
    {
        return this._http.post(this.base_url_lecture,data);
    }

}