import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Membersservice } from '../membersservice';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MembersInterface } from '../members-interface';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { DatePipe, NgIf } from '@angular/common';
import { MembersList } from '../members-list/members-list';

@Component({
  selector: 'app-detailmember',
  imports: [RouterLink, DatePipe],
  templateUrl: './detailmember.html',
  styleUrl: './detailmember.scss',
})
export class Detailmember implements OnInit {
  // var 
  route: ActivatedRoute = inject(ActivatedRoute);
  member = signal<MembersInterface | null>(null);   // signal state
  // loggedMember?: MembersInterface;
  loggedMember = signal<MembersInterface | undefined>(undefined);   // signal state
  un=localStorage.getItem('un');
  pw=localStorage.getItem('p');


  constructor(
    private memberservice:Membersservice,
    // private memberList:MembersList
  )
  { this.member = this.memberservice.member; }

  memId = Number(this.route.snapshot.params['id']);
  
  ngOnInit():void{
    console.log("ngOnInit");
    console.log(`token after refresh: ${localStorage.getItem('token')}`)
    this.memberservice.GetMemberById(this.memId).subscribe(
      x => {
        // this.memeber=x; 
        console.log(`x after fetch: ${x.dateJoined }`);
        this.member.set(x);
        console.log(`member  after fetch: ${this.member()}`);
        this.member();
        // console.log(`member name after update: ${this.memeber?.nom}`);
      },
      y => {console.log(`There was an error ${y}`)}
      
    );
    this.memberservice.GetMembersList().subscribe(
        x => {
          this.loggedMember.set(x.find(memb=>memb.userName===this.un && memb.password===this.pw));
          console.log(`loggedMember role on member detail: ${this.loggedMember()?.role}`)
          console.log(`loggedMember id on member detail: ${this.loggedMember()?.memberId}`)
          console.log(`memId on member detail: ${this.memId}`)
        },
        y=> {console.log(`There was an error ${y}`)}
    );
  };

}

