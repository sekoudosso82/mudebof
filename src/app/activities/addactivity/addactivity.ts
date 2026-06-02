import { Component, OnInit } from '@angular/core';
import { Interfaceactivity } from '../interfaceactivity';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Serviceactivity } from '../serviceactivity';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addactivity',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './addactivity.html',
  styleUrl: './addactivity.scss',
})
export class Addactivity implements OnInit{
  activity:any ={
    activityId:0,
    activityTitle:'',
    activityDescription:'',
    // activityDate:'',
    activityDate: new Date(),
    activityStatus:'',
    activityPhotoUrl:'',
  }
  // var 
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  
  constructor(
      private activityService:Serviceactivity,
      private router:Router,
      private http: HttpClient,
      private fb: FormBuilder,
  ) {
    //   this.activityForm = this.fb.group({
    //   activityId:0,
    //   activityTitle: ['', [
    //     Validators.required, 
    //     Validators.minLength(2), 
    //     Validators.maxLength(50),
    //     Validators.pattern(/^[a-zA-Z0-9_]+$/)
    //   ]],
    //   activityDescription: ['', [
    //     Validators.required, 
    //     Validators.minLength(2), 
    //     // Validators.maxLength(40)
    //   ]],
    //   activityStatus: ['', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     // Validators.maxLength(20),
    //     // Validators.pattern(/^[a-zA-Z0-9_]+$/)
    //   ]],
    //   activityPhotoUrl: [null], //photo: '',
    //   dateJoined:new Date(),

    // })
    }
    ngOnInit(): void {}
    
    // AddNewActivity():void{
    //   if (this.activityForm.valid) {
    //     console.log("activityForm");
    //     console.log(this.activityForm.value);
    //     const fd = new FormData();
    //     fd.append('activityId', this.activityForm.value.activityId);
    //     fd.append('activityTitle', this.activityForm.value.activityTitle);
    //     fd.append('activityDescription', this.activityForm.value.activityDescription);
    //     fd.append('activityStatus', this.activityForm.value.activityStatus);
    //     fd.append('dateJoined', Date());
    //     fd.append('activityPhotoUrl',  this.selectedFile.name);
    //     console.log(`formData to be send ${fd}`)
    //     // if (this.selectedFile) { formData.append('activityPhotoUrl', this.selectedFile);}
    //     this.SaveActivity(fd);
    //     // alert('Member Registered Successfully!');
    //   }
    // }
    SaveActivity():void{
      // // if (this.activityForm.valid) {
      //   console.log("activity");
      //   console.log(this.activity);
      //   console.log("selectedFile");
      //   console.log(this.selectedFile);
        const fd = new FormData();
        fd.append('activityId', this.activity.activityId);
        fd.append('activityTitle', this.activity.activityTitle);
        fd.append('activityDescription', this.activity.activityDescription);
        fd.append('activityStatus', this.activity.activityStatus);
        fd.append('dateJoined', Date());
        if (this.selectedFile) { fd.append('activityPhotoUrl', this.selectedFile);}
        // console.log(`fd photourl: ${fd.get('activityPhotoUrl')}`)
        this.SaveActivityFromService(fd);
        // alert('Member Registered Successfully!');
      }
    
    SaveActivityFromService(formData: FormData):void{
      formData.forEach((value, key) => { console.log(`${key}:`, value)});

      this.activityService.CreateActivityWithPhoto(formData).subscribe(
        x => {
          this.router.navigate(['/activities'])
          alert('nouvelle activite ajoutee');
        },
        y =>{
          console.log('there was a problem');
          alert('new activity was not saved');
          this.router.navigate(['/activities']);
          console.log(y);
        }
      );
    }

  onFileSelected(event: any) {
    // console.log(`event: ${event}`)
    // console.log(`event target: ${event.target.files[0]}`)

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
