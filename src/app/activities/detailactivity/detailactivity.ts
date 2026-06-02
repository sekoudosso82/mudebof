import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Interfaceactivity } from '../interfaceactivity';
import { Serviceactivity } from '../serviceactivity';

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

  constructor(
      private activityservice:Serviceactivity,
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
    console.log(`activity after oninit: ${this.activity()}`)
    console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)
  };



}
