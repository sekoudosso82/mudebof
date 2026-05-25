import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MembersInterface } from '../members-interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Membersservice } from '../membersservice';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addmember',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './addmember.html',
  styleUrl: './addmember.scss',
})
export class Addmember implements OnInit{
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
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      prenoms: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      userName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      role:'Membre',
      location:['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        // Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      phone:[, [ Validators.required, Validators.pattern(/^[0-9]{10}$/)] ],       // phone: ['', Validators.required],
      email: ['', [
        Validators.email, 
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]], // email:'', //       
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
      formData.append('dateJoined', Date());
      if (this.selectedFile) { formData.append('photo', this.selectedFile);}
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

