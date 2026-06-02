import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Membersservice } from '../membersservice';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MembersInterface } from '../members-interface';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { DatePipe, NgIf } from '@angular/common';

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


  constructor(
    private memberservice:Membersservice,
  )
  {
    this.member = this.memberservice.member;
  }

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
    console.log(`member after oninit: ${this.member()}`)
    console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)
  };

  // DeleteMember(memId:Number):void{
  //     this.memberservice.DeleteMember(memId).subscribe(
  //       x=>{
  //         this.members.set(this.members()?.filter(member => member.memberId !== memId));
  //         console.log('This memberhas been deleted');
  //         this.router.navigate(['/members']);
  //       },
  //       y=>{
  //         console.log('There was an error when deleting this member');
  //         this.router.navigate(['/members']);
  //       }
  //     )
  //   }

}

