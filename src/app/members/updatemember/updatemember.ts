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
  member = signal<MembersInterface | null>(null); // signal state

  memberForm: FormGroup;
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private memberservice:Membersservice,
    private fb: FormBuilder,
    private router:Router,
  )
  {  
    this.member = this.memberservice.member; 
    this.memberForm = this.fb.group({
      memberId:this.member()?.memberId,
      nom: [this.member()?.nom, [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(10),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      prenoms: [this.member()?.prenoms,  [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(40)
      ]],
      userName: [this.member()?.userName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      password: [this.member()?.password, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      role:'Membre',
      location:[this.member()?.location, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]],
      phone:[this.member()?.phone, [ 
        Validators.required, 
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      // email:this.member()?.email, 
      email: [this.member()?.email, [
        Validators.email, 
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]], 
      // photo: [null], //photo: this.member()?.,
      status:[this.member()?.status],
      // dateJoint:new Date(),
      isActive:this.member()?.status,
    });
  }

  memId = Number(this.route.snapshot.params['id']);
  
  ngOnInit():void{
    console.log("ngOnInit");
        console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)

    this.memberservice.GetMemberById(this.memId).subscribe(
      x => {
        // this.memeber=x; 
        console.log(`member name after x fetch: ${x.nom}`);
        this.member.set(x);
        console.log(`member name after fetch: ${this.member()?.nom}`);
        // this.member.update(x);
        // console.log(`member name after update: ${this.memeber?.nom}`);
      },
      y => {console.log(`There was an error ${y}`)}
    );
    console.log(`member name after oninit: ${this.member()?.nom}`)
        console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)

  };

  UpdateMemberData():void{
    if (this.memberForm.valid) {
      console.log(this.memberForm.value);
      const formData = new FormData();
      formData.append('memberId', this.memberForm.value.memberId);
      formData.append('nom', this.memberForm.value.nom);
      formData.append('prenoms', this.memberForm.value.prenoms);
      formData.append('userName', this.memberForm.value.userName);
      formData.append('password', this.memberForm.value.password);
      formData.append('role', this.memberForm.value.role);
      formData.append('location', this.memberForm.value.location);
      formData.append('phone', this.memberForm.value.phone);
      formData.append('email', this.memberForm.value.email);
      // if (this.selectedFile) { formData.append('photo', this.selectedFile);}
        this.SaveUpdatedMember(formData);
        // alert('Member updated Successfully!');
    }
    else{
      console.log('memberForm not valid');
    }
  }

  SaveUpdatedMember(formData: FormData):void{
      console.log('we are in SaveUpdatedMember member func');
      console.log(`new member nom is: ${formData.get('nom')}`);
      this.memberservice.UpdateMember(formData).subscribe(
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

}
