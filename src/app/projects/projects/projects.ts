import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InterfaceProject } from '../interface-project';
import { Serviceproject } from '../serviceproject';
import { Authservice } from '../../authservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit{
  // var
    projects = signal<InterfaceProject[]>([]);

    constructor(
      private serviceproject:Serviceproject,
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