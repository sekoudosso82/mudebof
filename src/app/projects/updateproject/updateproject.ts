import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InterfaceProject } from '../interface-project';
import { Serviceproject } from '../serviceproject';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateproject',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './updateproject.html',
  styleUrl: './updateproject.scss',
})
export class Updateproject implements OnInit {
  // var 
  route: ActivatedRoute = inject(ActivatedRoute);
  projectSignal = signal<InterfaceProject | null>(null); // signal state
  // project: FormGroup;

  project:any={
    projectId:0,
    projectTitle:'',
    projectDescription:'',
    projectStatus:'',
    projectDate: new Date(),
    projectPhotoUrl:'',
  }
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private serviceproject:Serviceproject,
    private fb: FormBuilder,
    private router:Router,
  )
  {}

  projectId = Number(this.route.snapshot.params['id']);
  
  ngOnInit():void{
    console.log("ngOnInit");
    console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)
    this.serviceproject.GetProjectById(this.projectId).subscribe(
      x => {
        // this.memeber=x; 
        console.log(`project name after x fetch: ${x.nom}`);
        this.projectSignal.set(x);
        this.project=x;
        console.log(`project id after fetch: ${this.projectSignal()?.projectId}`);
      },
      y => {console.log(`There was an error ${y}`)}
    );
    console.log(`project name after oninit: ${this.project()?.projectTitle}`)
    console.log(`token after oninit refresh: ${localStorage.getItem('token')}`)
  };

  UpdateprojectData():void{

      const formData = new FormData();
      formData.append('projectId', this.project.projectId);
      formData.append('projectTitle', this.project.projectTitle);
      formData.append('projectDescription', this.project.projectDescription);
      formData.append('projectStatus', this.project.projectStatus);

      if (this.selectedFile) { formData.append('projectPhotoUrl', this.selectedFile);}
        this.SaveUpdatedproject(formData);
        // alert('project updated Successfully!');
  }

  SaveUpdatedproject(formData: FormData):void{
      console.log('we are in SaveUpdatedproject project func');
      console.log(`updatedproject title is: ${formData.get('projectTitle')}`);
      this.serviceproject.UpdateProject(formData).subscribe(
        x => {
          this.router.navigate(['/projects'])
          alert('project was updated');
        },
        y =>{
          console.log('there was a problem');
          alert('project was not registered');
          this.router.navigate(['/projects']);
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