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
    location:'',
    phone:0,
    email:'',
    status:'',
    photo:'',
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
// http://localhost:5243/api/Members
  GetMembersList(){
    const token = this.auth.GetToken();
    console.log(`current members ${token}`)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<MembersInterface[]>('http://localhost:5243/api/Members', {headers})
    // return this.http.get<Members[]>('http://localhost:5243/api/Members', {headers})
  }

  GetMemberById(membId:number): Observable<any>{
    console.log(` memId in service: ${membId}`)
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:5243/api/Members/${membId}?memberId=${membId}`, {headers})
                                            // http://localhost:5243/api/Members

  }

  AddMember(memb:MembersInterface): Observable<any>{
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<MembersInterface>('http://localhost:5243/api/Members/CreateNewMember', memb)
  }

  RegisterMember(memb:MembersInterface): Observable<any>{
    // const token = this.auth.GetToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<MembersInterface>('http://localhost:5243/api/Members/RegisterMember', memb)
  }

  CreateMemberWithPhoto(formData:FormData): Observable<any>{
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:5243/api/Members/CreateMemberWithPhoto', formData)
  }

  
  UpdateMember(formData:FormData): Observable<any>{
    console.log('we are in UpdateMember func in service');
      console.log(`new member nom is: ${formData.get('nom')}`);
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<MembersInterface>('http://localhost:5243/api/Members/'+Number(formData.get('memberId')),formData, {headers})
  }

  DeleteMember(membId:Number): Observable<any>{
    console.log(`memberId to be  deleted from memberService ${membId}`);
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<MembersInterface>(`http://localhost:5243/api/Members/${membId}?memberId=${membId}`, {headers})
                                              //  http://localhost:5243/api/Members/1?memberId=1
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
      location:'',
      phone:0,
      email:'',
      status:'',
      photo:'',
      dateJoined:new Date(),
      isActive:true,
    };

    this.member.set(memberData);
  }


}
