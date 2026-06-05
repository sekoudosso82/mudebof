import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Membersservice } from '../membersservice';

@Component({
  selector: 'app-deletemember',
  imports: [RouterLink],
  templateUrl: './deletemember.html',
  styleUrl: './deletemember.scss',
})
export class Deletemember {
  route:ActivatedRoute = inject(ActivatedRoute);
  result?:boolean;

  constructor(
    private memberService:Membersservice,
    private router:Router
  ){}

  memId = Number(this.route.snapshot.params['id']);

  ngOnInit():void{
    console.log(`memberId to be  deleted ${this.memId}`);
  }
  
  DeleteMember(memId:Number):void{
      this.memberService.DeleteMember(this.memId).subscribe(
      x=>{
        this.result = x;
        console.log('member was deleted');
        alert(`${x.nom}  was deleted`);
        this.router.navigate(['/members']);
      },
      y=>{
        console.log(`there was an error ${y}`);
        alert('there was an error');
        this.router.navigate(['/members']);
      }
    )
    }
  Cancel() { this.router.navigate(['/members']); }
}