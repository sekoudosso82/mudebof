import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MembersInterface } from '../members/members-interface';
import { Membersservice } from '../members/membersservice';
import { FormBuilder, FormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { LoginInterface } from './login-interface';
import { RouterLink, Router , RouterLinkActive} from '@angular/router';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  // var 
  username:string=""
  password:string=""
  error:string=""
  currentLogged: LoginInterface ={userName:'', password:'',}

  constructor( 
    private router: Router,
    private authService: Authservice,
  ) {}
  authorizedMember? : MembersInterface ={
    memberId:0,
    nom:'',
    prenoms:'',
    userName:'',
    password:'',
    role:'',
    // accessLevel:'Member',
    location:'',
    phone:0,
    email:'',
    memberPhotoUrl: '',
    statut:'',
    dateJoined:new Date(),
    isActive:true,
  }
  memArr?: MembersInterface[];
  @Output() memEvent = new EventEmitter<LoginInterface>();
  
  ngOnInit(): void {}

  setCredentials(credential:string){sessionStorage.setItem('thing', credential)}

  Login() {
    console.log(`credential before login: ${this.currentLogged.userName}, ${this.currentLogged.password}`);
    this.memEvent.emit(this.currentLogged);
    console.log(`credential after login form: ${this.currentLogged.userName}, ${this.currentLogged.password}`);
    this.authService.Login({userName:this.currentLogged.userName, password:this.currentLogged.password}).subscribe({
      next:(res) => {
        this.authService.SaveToken(res.token);
        console.log(`token after login ${res.token}`);
        this.router.navigate(['/members']);
      },
      error:() => {
        alert('Essayez encore avec vos informations correctes');
        this.router.navigate(['/home']);
      }
    });
    this.authService.logged = this.currentLogged;
    console.log(`logged member after login is completed: ${this.currentLogged.userName}`);
  }

}
