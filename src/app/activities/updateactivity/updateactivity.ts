import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Interfaceactivity } from '../interfaceactivity';
import { Serviceactivity } from '../serviceactivity';

@Component({
  selector: 'app-updateactivity',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './updateactivity.html',
  styleUrl: './updateactivity.scss',
})
export class Updateactivity implements OnInit {
  // var 
  route: ActivatedRoute = inject(ActivatedRoute);
  activitySignal = signal<Interfaceactivity | null>(null); // signal state
  // activity: FormGroup;

  activity:any ={
    activityId:0,
    activityTitle:'',
    activityDescription:'',
    // activityDate:'',
    activityDate: new Date(),
    activityStatus:'',
    activityPhotoUrl:'',
  }
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private serviceactivity:Serviceactivity,
    private fb: FormBuilder,
    private router:Router,
  )
  {  
    // this.activity = this.serviceactivity.activity; 
    // this.activity = this.fb.group({
    //   activityId:this.activity()?.activityId,
    //   activityTitle: [this.activity()?.activityTitle, [
    //     Validators.required, 
    //     Validators.minLength(2), 
    //     Validators.maxLength(10),
    //     Validators.pattern(/^[a-zA-Z0-9_]+$/)
    //   ]],
    //   activityDescription: [this.activity()?.activityDescription,  [
    //     Validators.required, 
    //     Validators.minLength(2), 
    //     Validators.maxLength(40)
    //   ]],
    //   activityStatus: [this.activity()?.activityStatus, [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(20),
    //     Validators.pattern(/^[a-zA-Z0-9_]+$/)
    //   ]],
    //   activityDate: [this.activity()?.activityDate, [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(20),
    //     Validators.pattern(/^[a-zA-Z0-9_]+$/)
    //   ]],
      
    // });
  }

  actId = Number(this.route.snapshot.params['id']);
  
  ngOnInit():void{
    console.log("ngOnInit");
        console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)

    this.serviceactivity.GetActivityById(this.actId).subscribe(
      x => {
        // this.memeber=x; 
        console.log(`activity name after x fetch: ${x.nom}`);
        this.activitySignal.set(x);
        this.activity=x;
        console.log(`activity id after fetch: ${this.activitySignal()?.activityId}`);
        // this.activity.update(x);
        // console.log(`activity name after update: ${this.memeber?.nom}`);
      },
      y => {console.log(`There was an error ${y}`)}
    );
    console.log(`activity name after oninit: ${this.activity()?.activityTitle}`)
        console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)

  };

  UpdateactivityData():void{
    // if (this.activity.valid) {
    //   console.log(this.activity.value);
      const formData = new FormData();
      formData.append('activityId', this.activity.activityId);
      formData.append('activityTitle', this.activity.activityTitle);
      formData.append('activityDescription', this.activity.activityDescription);
      formData.append('activityStatus', this.activity.activityStatus);
      // formData.append('activityDate', this.activity.activityDate);

      if (this.selectedFile) { formData.append('activityPhotoUrl', this.selectedFile);}
        this.SaveUpdatedactivity(formData);
        // alert('activity updated Successfully!');
  }

  SaveUpdatedactivity(formData: FormData):void{
      console.log('we are in SaveUpdatedactivity activity func');
      console.log(`new activity title is: ${formData.get('activityTitle')}`);
      this.serviceactivity.UpdateActivity(formData).subscribe(
        x => {
          this.router.navigate(['/activities'])
          alert('Activity was updated');
        },
        y =>{
          console.log('there was a problem');
          alert('new activity was not registered');
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