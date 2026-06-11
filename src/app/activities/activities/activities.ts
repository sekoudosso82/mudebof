import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Interfaceactivity } from '../interfaceactivity';
import { Serviceactivity } from '../serviceactivity';
import { Authservice } from '../../authservice';
import { HttpClient } from '@angular/common/http';
import { MembersInterface } from '../../members/members-interface';
import { Membersservice } from '../../members/membersservice';

@Component({
  selector: 'app-activities',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './activities.html',
  styleUrl: './activities.scss',
})
export class Activities implements OnInit{
    activities = signal<Interfaceactivity[]>([]);

    loggedMember = signal<MembersInterface | undefined>(undefined);   // signal state
    un=localStorage.getItem('un');
    pw=localStorage.getItem('p');

    constructor(
      private serviceactivity:Serviceactivity,
      private membersservice:Membersservice,
      private router:Router, 
      private auth:Authservice,
      private http: HttpClient
    ){}

    ngOnInit():void{
      console.log(`token after refresh: ${localStorage.getItem('token')}`)
      this.serviceactivity.GetActivitiesList().subscribe(
        x => {
        this.activities.set(x);
        console.log(`current memberArr ${this.activities().length}`)
        // this.LoggedMemberData();
        },
        y=> {console.log(`There was an error ${y}`)}
      );
      this.membersservice.GetMembersList().subscribe(
        x => {
          this.loggedMember.set(x.find(memb=>memb.userName===this.un && memb.password===this.pw));
          // console.log(`loggedMember role on member detail: ${this.loggedMember()?.role}`)
          // console.log(`loggedMember id on member detail: ${this.loggedMember()?.memberId}`)
        },
        y=> {console.log(`There was an error ${y}`)}
    );
    }




  SortbyNomFunc():void{
      this.activities.set(this.activities()?.sort((a,b) => a.activityTitle.localeCompare(b.activityTitle)));
    }
    SortbyPrenomFunc():void{
      this.activities.set(this.activities()?.sort((a,b) => a.activityStatus.localeCompare(b.activityStatus)));
    }
    SortbyRoleFunc():void{
      // this.activities.sort(this.activities()?.sort((a,b) => a.activityDate.localeCompare(b.activityDate)));
      this.activities.update(activities => 
        [...activities].sort (
        (a, b) =>
          new Date(a.activityDate).getTime() -
          new Date(b.activityDate).getTime()
        )   
      );
    }


}
