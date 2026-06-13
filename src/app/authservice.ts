import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from './login/login-interface';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  httpOptions={
    Headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  logged?: {userName:string, password:string}
  ngOnInit(): void{
    this.logged=this.logged;
  }

  // private baseUrl = 'https://localhost:7097/api/Auth/login';
  // private baseUrl = 'http://localhost:5243/api/Auth';
  private baseUrl = 'https://localhost:7097/api/Auth';
    //  baseUrl = 'https://localhost:7097'
  //  baseUrl: 'http://localhost:5243'

  constructor(private http:HttpClient){}

  Login(credentials:{userName:string, password:string}){
    this.logged=credentials;
    localStorage.setItem('un', credentials.userName);
    localStorage.setItem('p', credentials.password);
    return this.http.post<{token:string}>(`${this.baseUrl}/login`, credentials);
  }
  SaveToken(tokennn:string){localStorage.setItem('token', tokennn);}
  GetToken(){ return localStorage.getItem('token');}
  IsLogged():boolean{ return !!this.GetToken }
  Logout(){ 
    localStorage.removeItem('token');
    localStorage.clear();
    console.log(`token after logout: ${localStorage.getItem('token')}`)
  }

}
