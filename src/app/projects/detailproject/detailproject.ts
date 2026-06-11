import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InterfaceProject } from '../interface-project';
import { Serviceproject } from '../serviceproject';
import { MembersInterface } from '../../members/members-interface';
import { Membersservice } from '../../members/membersservice';

@Component({
  selector: 'app-detailproject',
  imports: [RouterLink, DatePipe],
  templateUrl: './detailproject.html',
  styleUrl: './detailproject.scss',
})
export class Detailproject implements OnInit{
  // var 
  route: ActivatedRoute = inject(ActivatedRoute);
  project = signal<InterfaceProject | null>(null);   // signal state

  loggedMember = signal<MembersInterface | undefined>(undefined);   // signal state
  un=localStorage.getItem('un');
  pw=localStorage.getItem('p');

  constructor(
      private serviceproject:Serviceproject,
      private membersservice:Membersservice
  )
  {
      this.project = this.serviceproject.project;
  }

  projectId = Number(this.route.snapshot.params['id']);
  
  ngOnInit():void{
    console.log("ngOnInit");
    // console.log(`token after refresh: ${localStorage.getItem('token')}`)
    this.serviceproject.GetProjectById(this.projectId).subscribe(
      x => {
        // this.memeber=x; 
        console.log(`x after fetch: ${x.projectId}`);
        this.project.set(x);
        // console.log(`member  after fetch: ${this.activity()}`);
        // this.activity();
        // console.log(`member name after update: ${this.memeber?.nom}`);
      },
      y => {console.log(`There was an error ${y}`)}
    );
    this.membersservice.GetMembersList().subscribe(
        x => {
          this.loggedMember.set(x.find(memb=>memb.userName===this.un && memb.password===this.pw));
          console.log(`loggedMember role on member detail: ${this.loggedMember()?.role}`)
          console.log(`loggedMember id on member detail: ${this.loggedMember()?.memberId}`)
        },
        y=> {console.log(`There was an error ${y}`)}
    );
    console.log(`activity after oninit: ${this.project()}`)
    console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)
  };



}
