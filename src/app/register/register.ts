import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Membersservice } from '../members/membersservice';
import { MembersInterface } from '../members/members-interface';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Authservice } from '../authservice';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

///

export class Register  implements OnInit{
  member:any ={
      memberId:0,
      nom:'',
      prenoms:'',
      userName:'',
      password:'',
      role:'',
      accessLevel:'',
      location:'',
      phone:0,
      email:'',
      // status:'',
      dateJoined:new Date(),
      isActive:true,
      memberPhotoUrl: '',
  }

  // var 
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private memberService:Membersservice,
    private router:Router,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {}

  SaveMember():void{
      const fd = new FormData();
      fd.append('memberId', this.member.memberId);
      fd.append('nom', this.member.nom);
      fd.append('prenoms', this.member.prenoms);
      fd.append('userName', this.member.userName);
      fd.append('password', this.member.password);
      fd.append('role', this.member.role);
      fd.append('accessLevel', this.member.accessLevel);
      fd.append('location', this.member.location);
      fd.append('phone', this.member.phone);
      fd.append('email', this.member.email);
      // fd.append('dateJoined', Date());
      fd.append('email', this.member.isActive);
      if (this.selectedFile) { fd.append('memberPhotoUrl', this.selectedFile);}
        this.SaveMemberFromService(fd);
        // alert('Member Registered Successfully!');
  }

  SaveMemberFromService(formData: FormData):void{
    console.log(" formData in  member ts")
    formData.forEach((value, key) => { console.log(`${key}:`, value)});
    this.memberService.CreateMember(formData).subscribe(
      x => {
        this.router.navigate(['/members'])
        alert('nouveau membre ajouter');
      },
      y =>{
        console.log('there was a problem');
        alert('new member was not registered');
        this.router.navigate(['/members']);
        console.log(y);
      }
    );
  }

   onFileSelected(event: any) {
    const file  = event.target.files[0];
    // console.log(`current file : ${file}`)
    if (file) {
      this.selectedFile = file;
      // console.log(`selectedFile name : ${this.selectedFile.name}`)

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // reader.readAsDataURL(this.selectedFile);
    }
  }

}

