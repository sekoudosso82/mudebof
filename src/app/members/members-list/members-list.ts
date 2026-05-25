import { AfterViewInit, Component, EventEmitter, OnInit, Output, output, signal, ViewEncapsulation } from '@angular/core';
import { Membersservice } from '../membersservice';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
// import { AddMember } from '../add-member/add-member';
// import { ListProjects } from '../../projects/list-projects/list-projects';
import { Authservice } from '../../authservice';
import { MembersInterface } from '../members-interface';
import { HttpClient } from '@angular/common/http';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-members-list',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './members-list.html',
  styleUrl: './members-list.scss',
})
export class MembersList implements OnInit{
  // var 
  
  // memberArr? : MembersInterface[];
  members = signal<MembersInterface[]>([]);
  ///
  // members: any[] = [];
  membersss = signal<MembersInterface[]>([]); 
  viewReady = false;
  ///
  un=localStorage.getItem('un');
  pw=localStorage.getItem('p');

  memberDetail?: MembersInterface;
  chosenMember?: MembersInterface;
  loggedMember?: MembersInterface;
  showAddMember?: boolean=false;

  authorizedMemb:any;
  roleValue: any;

  logoutMember? : MembersInterface={
    memberId:0, nom:'', prenoms:'', userName:'',
    password:'', role:'', location:'', phone:0,
    email:'', status:'', photo:'', dateJoined:new Date(), isActive:true,
  }

  @Output() membLogoutEvent = new EventEmitter<MembersInterface>()
    constructor(
      private memberservice:Membersservice,
      private router:Router, 
      private auth:Authservice,
      private http: HttpClient
    ){}
    ngOnInit():void{
      console.log(`token after refresh: ${localStorage.getItem('token')}`)
      this.memberservice.GetMembersList().subscribe(
        x => {
          this.members.set(x);
          console.log(`current memberArr ${this.members().length}`)
          this.LoggedMemberData();
        },
        y=> {console.log(`There was an error ${y}`)}
      );
      // console.log(`current membersss ngoninit ${this.memberArr?.length}`)

      var value = this.auth.GetToken();
      console.log(`token: ${value}`);
      this.LoggedMemberData();
    }
  
  // upload photo end
    LoggedMemberData():void{
      console.log(`logged mem cred in locale storage ${this.un} & ${this.pw}`);
      this.loggedMember = this.members()?.find(memb=>memb.userName===this.un);
      console.log(`member array: ${this.members()}`)
      console.log(`${this.loggedMember?.userName} is currently logged`);
    }

    // MemberDetail(memb:Number):void{
    //   this.chosenMember = this.memberArr?.find(x=>x.memberId===memb);
    // }
    DeleteMember(memId:Number):void{
      this.memberservice.DeleteMember(memId).subscribe(
        x=>{
          this.members.set(this.members()?.filter(member => member.memberId !== memId));
          console.log('This memberhas been deleted');
          this.router.navigate(['/members']);
        },
        y=>{
          console.log('There was an error when deleting this member');
          this.router.navigate(['/members']);
        }
      )
    }

    SortbyNomFunc():void{
      this.members.set(this.members()?.sort((a,b) => a.nom.localeCompare(b.nom)));
    }
    SortbyPrenomFunc():void{
      this.members.set(this.members()?.sort((a,b) => a.prenoms.localeCompare(b.prenoms)));
    }
    SortbyRoleFunc():void{
      this.members.set(this.members()?.sort((a,b) => a.role.localeCompare(b.role)));
    }
    SortbyStatusFunc():void{
      this.members.set(this.members()?.sort((a,b) => a.status.localeCompare(b.status)));
    }
    SortbyLocationFunc():void{
      this.members.set(this.members()?.sort((a,b) => a.location.localeCompare(b.location)));
    }

}