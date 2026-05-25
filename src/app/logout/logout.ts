import { Component, EventEmitter, Output } from '@angular/core';
import { MembersInterface } from '../members/members-interface';
import { Membersservice } from '../members/membersservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {

  logoutMember? : MembersInterface ={
      memberId:0,
      nom:'',
      prenoms:'',
      userName:'',
      password:'',
      role:'Membre',
      location:'',
      phone:0,
      email:'',
      photo: '',
      status:'',
      dateJoined:new Date(),
      isActive:true,
    }
  destroyMember? : MembersInterface ={
      memberId:0,
      nom:'',
      prenoms:'',
      userName:'',
      password:'',
      role:'Membre',
      location:'',
      phone:0,
      email:'',
      photo: '',
      status:'',
      dateJoined:new Date(),
      isActive:true,
    }
    @Output() memEvent = new EventEmitter<MembersInterface>()
    constructor(
      private memberService : Membersservice,
      private router:Router
    ){}
    Oninit():void{}
    DestroyCredential(){
      sessionStorage.clear();
      localStorage.removeItem('token')
      console.log(`token after logout: ${localStorage.getItem('token')}`)
    }
    Logout(): void{
      this.destroyMember = this.memberService.GetCurrentMember();
      this.memberService.AuthorizedMemb(this.destroyMember);
      this.DestroyCredential();
      this.logoutMember = this.memberService.GetCurrentMember();
      this.router.navigate(['/login']);

    }
    Cancel() { this.router.navigate(['/members']); }
}
