import { Component, inject, OnInit, signal } from '@angular/core';
import { Membersservice } from '../membersservice';
import { MembersInterface } from '../members-interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatemember',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './updatemember.html',
  styleUrl: './updatemember.scss',
})
export class Updatemember implements OnInit {
  // var 
  route: ActivatedRoute = inject(ActivatedRoute);
  memberSignal = signal<MembersInterface | null>(null); // signal state

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

  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private memberservice:Membersservice,
    private fb: FormBuilder,
    private router:Router,
  )
  {}

  memId = Number(this.route.snapshot.params['id']);
  
  ngOnInit():void{
    console.log("ngOnInit");
    console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)
    this.memberservice.GetMemberById(this.memId).subscribe(
      x => {
        // this.memeber=x; 
        console.log(`member name after x fetch: ${x.nom}`);
        this.memberSignal.set(x);
        this.member=x;
        console.log(`member name after fetch: ${this.memberSignal()?.nom}`);
      },
      y => {console.log(`There was an error ${y}`)}
    );

    console.log(`member name after oninit: ${this.memberSignal()?.nom}`)
    console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)

  };

  UpdateMemberData():void{
      const formData = new FormData();
      formData.append('memberId', this.member.memberId);
      formData.append('nom', this.member.nom);
      formData.append('prenoms', this.member.prenoms);
      formData.append('userName', this.member.userName);
      formData.append('password', this.member.password);
      formData.append('role', this.member.role);
      formData.append('accessLevel', this.member.accessLevel);
      formData.append('location', this.member.location);
      formData.append('phone', this.member.phone);
      formData.append('email', this.member.email);
      if (this.selectedFile) { formData.append('memberPhotoUrl', this.selectedFile);}
        
      this.SaveUpdatedMember(formData);
        // alert('Member updated Successfully!');
  }

  SaveUpdatedMember(formData: FormData):void{
      console.log('we are in SaveUpdatedMember member func');
      console.log(`new member nom is: ${formData.get('nom')}`);
      this.memberservice.UpdateMember(formData).subscribe(
        x => {
          this.router.navigate(['/members'])
          alert('member was updated');
        },
        y =>{
          console.log('there was a problem');
          alert(' member was not updated');
          this.router.navigate(['/members']);
          console.log(y);
        }
      );
  }

  
  onFileSelected(event: any) {
    const file  = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }



}
