import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Serviceactivity } from '../serviceactivity';

@Component({
  selector: 'app-deleteactivity',
  imports: [],
  templateUrl: './deleteactivity.html',
  styleUrl: './deleteactivity.scss',
})
export class Deleteactivity {
  route:ActivatedRoute = inject(ActivatedRoute);
  result?:boolean;

  constructor( 
    private serviceactivity:Serviceactivity,
    private router:Router  
  ){}

  activityId = Number(this.route.snapshot.params['id']);

  ngOnInit():void{
    console.log(`memberId to be  deleted ${this.activityId}`);
  }

  DeleteActivity(activityId:Number):void{
      this.serviceactivity.DeleteActivities(this.activityId).subscribe(
      x=>{
        this.result = x;
        console.log('activity was deleted');
        // alert('activity was deleted');
        this.router.navigate(['/activities']);
      },
      y=>{
        console.log(`there was an error ${y}`);
        // alert('there was an error');
        this.router.navigate(['/activities']);
      }
    )
    }
  Cancel() { this.router.navigate(['/activities']); }
}
