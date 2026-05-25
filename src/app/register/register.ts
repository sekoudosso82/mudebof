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
  createMember:MembersInterface ={
      memberId:0,
      nom:'',
      prenoms:'',
      userName:'',
      password:'',
      role:'Membre',
      location:'',
      phone:0,
      email:'',
      photo: '',
      status:'',
      dateJoined:new Date(),
      isActive:true,
    }
    newMember:MembersInterface ={
      memberId:0,
      nom:'',
      prenoms:'',
      userName:'',
      password:'',
      role:'Membre',
      location:'',
      phone:0,
      email:'',
      photo: '',
      status:'',
      dateJoined:new Date(),
      isActive:true,
    }
    // var 
        selectedFile!: File;

    @Output() memberEvent = new EventEmitter<MembersInterface>();
    showMemberForm:boolean=true;
    createMemberResult:number=0;
    memberForm: FormGroup;
    imagePreview: string | ArrayBuffer | null = null;
    constructor(
      private memberService:Membersservice,
      private router:Router,
      private http: HttpClient,
      private fb: FormBuilder,
    ) {
      this.memberForm = this.fb.group({
      memberId:0,
      nom: ['', Validators.required],
      prenoms: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role:'Membre',
      location:[''],
      phone:[, Validators.required],       // phone: ['', Validators.required],
      // email:'', //      
       email: ['', [Validators.email]],
      photo: [null], //photo: '',
      status:[''],
      dateJoined:new Date(),
      isActive:true,
    });
    }
    ngOnInit(): void {}
    onSubmit() {
    if (this.memberForm.valid) {
      console.log(this.memberForm.value);
      // alert('Member Registered Successfully!');
    }
  }
    AddNewMember():void{
      if (this.memberForm.valid) {
      console.log(this.memberForm.value);
      // this.memberEvent.emit(this.newMember);
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
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }
        this.RegisterMember(formData);
        console.log('createMemberResult');
        console.log(this.createMemberResult);
        // alert('Member Registered Successfully!');
      }
    }
    RegisterMember(formData: FormData):void{
      console.log('we are in register member func');
      console.log(`new member nom is: ${formData.get('nom')}`);
      this.memberService.CreateMemberWithPhoto(formData).subscribe(
        x => {
          this.router.navigate(['/home'])
          alert('nouveau membre ajouter');
        },
        y =>{
          console.log('there was a problem');
          alert('new member was not registered');
          this.router.navigate(['/home']);
          console.log(y);
        }
      );
    }
    MemberReactiveFormsSubmit(event:MouseEvent): void{ console.log('The event was trigger')}
  
    onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
    onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.memberForm.patchValue({ photo: file });
      this.memberForm.get('photo')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}

