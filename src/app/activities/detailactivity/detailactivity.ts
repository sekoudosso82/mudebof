import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Interfaceactivity } from '../interfaceactivity';
import { Serviceactivity } from '../serviceactivity';
import { Membersservice } from '../../members/membersservice';
import { MembersInterface } from '../../members/members-interface';

@Component({
  selector: 'app-detailactivity',
  imports: [RouterLink, DatePipe],
  templateUrl: './detailactivity.html',
  styleUrl: './detailactivity.scss',
})
export class Detailactivity implements OnInit{
  // var 
  route: ActivatedRoute = inject(ActivatedRoute);
  activity = signal<Interfaceactivity | null>(null);   // signal state

  loggedMember = signal<MembersInterface | undefined>(undefined);   // signal state
  un=localStorage.getItem('un');
  pw=localStorage.getItem('p');

  constructor(
      private activityservice:Serviceactivity,
      private membersservice:Membersservice
      
  )
  {
      this.activity = this.activityservice.activity;
  }

  activityId = Number(this.route.snapshot.params['id']);
  
  ngOnInit():void{
    console.log("ngOnInit");
    // console.log(`token after refresh: ${localStorage.getItem('token')}`)
    this.activityservice.GetActivityById(this.activityId).subscribe(
      x => {
        // this.memeber=x; 
        console.log(`x after fetch: ${x.activityTitle}`);
        this.activity.set(x);
        // console.log(`member  after fetch: ${this.activity()}`);
        // this.activity();
        // console.log(`member name after update: ${this.memeber?.nom}`);
      },
      y => {console.log(`There was an error ${y}`)}
    );
    this.membersservice.GetMembersList().subscribe(
        x => {
          this.loggedMember.set(x.find(memb=>memb.userName===this.un && memb.password===this.pw));
          // console.log(`loggedMember role on member detail: ${this.loggedMember()?.role}`)
          // console.log(`loggedMember id on member detail: ${this.loggedMember()?.memberId}`)
        },
        y=> {console.log(`There was an error ${y}`)}
    );
    // console.log(`activity after oninit: ${this.activity()}`)
    // console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)
  };



}
