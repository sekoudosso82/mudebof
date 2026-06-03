import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Servicereglement } from '../servicereglement';
import { Authservice } from '../../authservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reglements',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './reglements.html',
  styleUrl: './reglements.scss',
})
export class Reglements implements OnInit{
  constructor(
      private servicereglement:Servicereglement,
      private router:Router, 
      private auth:Authservice,
      private http: HttpClient
    ){}

    ngOnInit():void{
      
    }
}
