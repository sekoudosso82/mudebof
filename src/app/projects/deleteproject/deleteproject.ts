import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Serviceactivity } from '../../activities/serviceactivity';
import { Serviceproject } from '../serviceproject';

@Component({
  selector: 'app-deleteproject',
  imports: [RouterLink],
  templateUrl: './deleteproject.html',
  styleUrl: './deleteproject.scss',
})
export class Deleteproject {
  route:ActivatedRoute = inject(ActivatedRoute);
  result?:boolean;

  constructor( 
    private serviceproject:Serviceproject,
    private router:Router  
  ){}

  projId = Number(this.route.snapshot.params['id']);

  ngOnInit():void{
    console.log(`memberId to be  deleted ${this.projId}`);
  }

  DeleteProject(projectId:Number):void{
      this.serviceproject.DeleteProject(this.projId).subscribe(
      x=>{
        this.result = x;
        console.log('activity was deleted');
        alert('activity was deleted');
        this.router.navigate(['/projects']);
      },
      y=>{
        console.log(`there was an error ${y}`);
        alert('there was an error');
        this.router.navigate(['/projects']);
      }
    )
    }
  Cancel() { this.router.navigate(['/projects']); }
}
