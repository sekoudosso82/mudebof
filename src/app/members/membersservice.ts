import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Authservice } from '../authservice';
import { MembersInterface } from './members-interface';

@Injectable({
  providedIn: 'root',
})
export class Membersservice {
  // var 
  header = new HttpHeaders();
  httpOptions={ 
    Headers:new HttpHeaders({ 'Content-Type':'application/json'})
  };

  authorizedMember:MembersInterface={
    memberId:0,
    nom:'',
    prenoms:'',
    userName:'',
    password:'',
    role:'',
    statut:'',
    // accessLevel:'Member',
    location:'',
    phone:0,
    email:'',
    memberPhotoUrl:'',
    dateJoined:new Date(),
    isActive:true,
  }

  constructor(private http:HttpClient, private auth:Authservice ){}

  ngOninit():void{
    this.httpOptions={
      Headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        Authorization: `Bearer ${this.auth.GetToken()}`
      })
    }
  }
// baseUrl: http://localhost:5243/api/Members
private baseUrl = 'https://localhost:7097/api/Members';


RegisterMember(formData:FormData): Observable<any>{
  console.log(" formData in service Member")
  formData.forEach((value, key) => { console.log(`${key}:`, value)});
  const token = this.auth.GetToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // return this.http.post('http://localhost:5243/api/Members/RegisterMember', formData)
  return this.http.post(`${this.baseUrl}/RegisterMember`, formData)

}

CreateMember(formData:FormData): Observable<any>{
  console.log(" formData in service Member")
  formData.forEach((value, key) => { console.log(`${key}:`, value)});
  const token = this.auth.GetToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post('http://localhost:5243/api/Members/CreateMember', formData)
}

GetMembersList(){
  const token = this.auth.GetToken();
  console.log(`current members ${token}`)
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<MembersInterface[]>(`${this.baseUrl}`, {headers})

  // return this.http.get<MembersInterface[]>('http://localhost:5243/api/Members', {headers})
}

GetMemberById(membId:number): Observable<any>{
    console.log(` memId in service: ${membId}`)
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/${membId}?memberId=${membId}`, {headers})
    // return this.http.get<any>(`http://localhost:5243/api/Members/${membId}?memberId=${membId}`, {headers})

}


UpdateMember(formData:FormData): Observable<any>{
    console.log('we are in Update Member func in service');
    console.log("update Project")
    formData.forEach((value, key) => { console.log(`${key}:`, value)});

    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<MembersInterface>(`${this.baseUrl}/`+ Number(formData.get('memberId')),formData, {headers})
    // return this.http.put<MembersInterface>('http://localhost:5243/api/Members/'+Number(formData.get('memberId')),formData, {headers})
}



DeleteMember(membId:Number): Observable<any>{
    console.log(`memberId to be  deleted from memberService ${membId}`);
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<MembersInterface>('http://localhost:5243/api/Members/${membId}?memberId=${membId}', {headers})
}

AuthorizedMemb(memb:MembersInterface){this.authorizedMember=memb;}

GetCurrentMember():MembersInterface{return this.authorizedMember;}

// signal state
  member = signal<MembersInterface | null>(null);

  loadMember() {

    // mock API response
    const memberData: MembersInterface = {
      memberId:0,
      nom:'',
      prenoms:'',
      userName:'',
      password:'',
      role:'',
      statut:'',
      // accessLevel:'',
      location:'',
      phone:0,
      email:'',
      memberPhotoUrl:'',
      dateJoined:new Date(),
      isActive:true,
    };

    this.member.set(memberData);
  }


}
