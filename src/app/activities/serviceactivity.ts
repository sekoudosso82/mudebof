import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authservice } from '../authservice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Serviceactivity {
  // var 
  header = new HttpHeaders();
  httpOptions={ 
    Headers:new HttpHeaders({ 'Content-Type':'application/json'})
  };

  constructor(private http:HttpClient, private auth:Authservice ){}

  ngOninit():void{
    this.httpOptions={
      Headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        Authorization: `Bearer ${this.auth.GetToken()}`
      })
    }
  }

  CreateActivityWithPhoto(formData:FormData): Observable<any>{
    console.log("CreateActivityWithPhoto")
    formData.forEach((value, key) => { console.log(`${key}:`, value)});

    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:5243/api/Activities/CreateNewActivity', formData)
  }

}
