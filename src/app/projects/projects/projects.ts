import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InterfaceProject } from '../interface-project';
import { Serviceproject } from '../serviceproject';
import { Authservice } from '../../authservice';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Membersservice } from '../../members/membersservice';
import { MembersInterface } from '../../members/members-interface';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit{
  // var
    projects = signal<InterfaceProject[]>([]);

    loggedMember = signal<MembersInterface | undefined>(undefined);   // signal state
    un=localStorage.getItem('un');
    pw=localStorage.getItem('p');

    constructor(
      private serviceproject:Serviceproject,
      private membersservice:Membersservice,
      private router:Router, 
      private auth:Authservice,
      private http: HttpClient
    ){}

    ngOnInit():void{
      console.log(`token after refresh: ${localStorage.getItem('token')}`)
      this.serviceproject.GetProjectsList().subscribe(
        x => {
        this.projects.set(x);
        console.log(`current projectArr ${this.projects().length}`)
        // console.log(`1st projectArr  ${this.projects()[0].ProjectId}`)
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
    this.projects.set(this.projects()?.sort((a,b) => a.projectTitle.localeCompare(b.projectTitle)));
  }
    SortbyPrenomFunc():void{
      this.projects.set(this.projects()?.sort((a,b) => a.projectStatus.localeCompare(b.projectStatus)));
    }
    SortbyDateFunc():void{
      // this.projects.sort(this.projects()?.sort((a,b) => a.ProjectDate.localeCompare(b.ProjectDate)));
      this.projects.update(projects => 
        [...projects].sort (
        (a, b) =>
          new Date(a.projectDate).getTime() -
          new Date(b.projectDate).getTime()
        )   
      );
    }


}