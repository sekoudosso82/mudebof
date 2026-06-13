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
  // baseUlr = 'https://localhost:7097'
  private baseUrl = 'https://localhost:7097/api/Activities';
  
  CreateActivityWithPhoto(formData:FormData): Observable<any>{
    console.log("CreateActivityWithPhoto")
    formData.forEach((value, key) => { console.log(`${key}:`, value)});
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/CreateNewActivity`, formData)
  }

  GetActivitiesList(){
      const token = this.auth.GetToken();
      // console.log(`current  ${token}`)
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Interfaceactivity[]>(`${this.baseUrl}`, {headers})
  }

   GetActivityById(actId:number): Observable<any>{
    console.log(` activityId in service: ${actId}`)
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.get<any>(`http://localhost:5243/api/Activities/${actId}`, {headers})
    // return this.http.get<any>(`http://localhost:5243/api/Activities/${actId}?activityId=${actId}`, {headers})
    return this.http.get<any>(`${this.baseUrl}/${actId}?activityId=${actId}`, {headers})

  }

  DeleteActivities(actId:Number): Observable<any>{
    console.log(`actId to be  deleted from activityService ${actId}`);
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.delete<Interfaceactivity>(`http://localhost:5243/api/Activities/${actId}?activityId=${actId}`, {headers})
    return this.http.delete<Interfaceactivity>(`${this.baseUrl}/${actId}?activityId=${actId}`, {headers})

  }

  UpdateActivity(formData:FormData): Observable<any>{
      console.log('we are in UpdateActivity func in service');
        // console.log(`new activity tittle is: ${formData.get('activityTitle')}`);
            console.log("updateActivityWithPhoto")
    formData.forEach((value, key) => { console.log(`${key}:`, value)});
      const token = this.auth.GetToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // return this.http.put<Interfaceactivity>('http://localhost:5243/api/Activities/'+Number(formData.get('activityId')),formData, {headers})
      return this.http.put<Interfaceactivity>(`${this.baseUrl}/`+Number(formData.get('activityId')),formData, {headers})
      // return this.http.put<MembersInterface>(`${this.baseUrl}/`+ Number(formData.get('memberId')),formData, {headers})

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
