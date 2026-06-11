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
  ) {}
    ngOnInit(): void {}

    SaveActivity():void{
        const fd = new FormData();
        fd.append('activityId', this.activity.activityId);
        fd.append('activityTitle', this.activity.activityTitle);
        fd.append('activityDescription', this.activity.activityDescription);
        fd.append('activityStatus', this.activity.activityStatus);
        if (this.selectedFile) { fd.append('activityPhotoUrl', this.selectedFile);}
        this.SaveActivityFromService(fd);
        // alert('Member Registered Successfully!');
      }
    
    SaveActivityFromService(formData: FormData):void{
      formData.forEach((value, key) => { console.log(`${key}:`, value)});

      this.activityService.CreateActivityWithPhoto(formData).subscribe(
        x => {
          this.router.navigate(['/activities'])
          // alert('nouvelle activite ajoutee');
        },
        y =>{
          console.log('there was a problem');
          // alert('new activity was not saved');
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
