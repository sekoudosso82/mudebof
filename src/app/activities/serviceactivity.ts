import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Authservice } from '../authservice';
import { Observable } from 'rxjs';
import { Interfaceactivity } from './interfaceactivity';

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

  GetActivitiesList(){
      const token = this.auth.GetToken();
      // console.log(`current  ${token}`)
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Interfaceactivity[]>('http://localhost:5243/api/Activities', {headers})
  }

   GetActivityById(actId:number): Observable<any>{
    console.log(` activityId in service: ${actId}`)
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.get<any>(`http://localhost:5243/api/Activities/${actId}`, {headers})
    return this.http.get<any>(`http://localhost:5243/api/Activities/${actId}?activityId=${actId}`, {headers})

                              //  http://localhost:5243/api/Activities/2

  }

  // signal state
  activity = signal<Interfaceactivity | null>(null);

  loadActivity() {

    // mock API response
    const activityData: Interfaceactivity = {
      activityId:0,
      activityTitle:'',
      activityDescription:'',
      activityStatus:'',
      activityDate: new Date(),
      activityPhotoUrl:'',
    };
    this.activity.set(activityData);
  }

}
