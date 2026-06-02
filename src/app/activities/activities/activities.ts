import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Interfaceactivity } from '../interfaceactivity';
import { Serviceactivity } from '../serviceactivity';
import { Authservice } from '../../authservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  // imports: [],
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './activities.html',
  styleUrl: './activities.scss',
})
export class Activities {
    activities = signal<Interfaceactivity[]>([]);

    constructor(
      private serviceactivity:Serviceactivity,
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
