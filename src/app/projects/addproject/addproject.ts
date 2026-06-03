import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Serviceproject } from '../serviceproject';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addproject',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './addproject.html',
  styleUrl: './addproject.scss',
})
export class Addproject implements OnInit{

  project:any={
    projectId:0,
    projectTitle:'',
    projectDescription:'',
    projectStatus:'',
    projectDate: new Date(),
    projectPhotoUrl:'',
  }
  // var 
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  
  constructor(
      private serviceproject:Serviceproject,
      private router:Router,
      private http: HttpClient,
      private fb: FormBuilder,
  ) {}
    ngOnInit(): void {}

    SaveProject():void{
        const fd = new FormData();
        fd.append('projectId', this.project.projectId);
        fd.append('projectTitle', this.project.projectTitle);
        fd.append('projectDescription', this.project.projectDescription);
        fd.append('projectStatus', this.project.projectStatus);
        // fd.append('projectDate', Date());
        if (this.selectedFile) { fd.append('projectPhotoUrl', this.selectedFile);}
        // console.log(`fd photourl: ${fd.get('projectPhotoUrl')}`)
        this.SaveprojectFromService(fd);
        // alert('Member Registered Successfully!');
      }
    
    SaveprojectFromService(formData: FormData):void{
       console.log(" formData in  project ts")
      formData.forEach((value, key) => { console.log(`${key}:`, value)});

      this.serviceproject.CreateProject(formData).subscribe(
        x => {
          this.router.navigate(['/projects'])
          alert('nouvelle activite ajoutee');
        },
        y =>{
          console.log('there was a problem');
          alert('new project was not saved');
          this.router.navigate(['/projects']);
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
