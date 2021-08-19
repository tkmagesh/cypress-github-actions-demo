import {Bug} from '../models/bug'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
@Injectable({
    providedIn : 'root'
})
export class BugApi {
    private serviceEndpoint = 'http://localhost:3000/bugs'

    constructor(private http : HttpClient ){
        
    }

    getAll() : Observable<Bug[]>{
        return this.http
        .get<Bug[]>(this.serviceEndpoint)
        .pipe(
            map(bugs => bugs.filter(bug => !bug.isClosed))
        )
    }

    save(bugData : Bug) : Observable<Bug> {
        if (bugData.id === 0){
            return this.http.post<Bug>(this.serviceEndpoint, bugData)
        } else {
            return this.http.put<Bug>(this.serviceEndpoint + '/' + bugData.id, bugData)
        }
    }

    getById(id : number) : Observable<Bug>{
        return this.http.get<Bug>(this.serviceEndpoint + '/' + id)
    }

    remove(bugData : Bug) : Observable<any> {
        return this.http.delete<any>(this.serviceEndpoint + '/' + bugData.id)
    }

}