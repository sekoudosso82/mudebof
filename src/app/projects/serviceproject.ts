import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Authservice } from '../authservice';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceProject } from './interface-project';

@Injectable({
  providedIn: 'root',
})
export class Serviceproject {
  // var 
  header = new HttpHeaders();
  httpOptions={ 
    Headers:new HttpHeaders({ 'Content-Type':'application/json'})
  };

  constructor(private http:HttpClient, private auth:Authservice ){}

  ngOninit():void{
    this.httpOptions={
      Headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        Authorization: `Bearer ${this.auth.GetToken()}`
      })
    }
  }
  //baseUrl: http://localhost:5243/api/Projects/

  CreateProject(formData:FormData): Observable<any>{
    console.log(" formData in service project")
    formData.forEach((value, key) => { console.log(`${key}:`, value)});
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:5243/api/Projects/CreateNewProject', formData)

  }

  GetProjectsList(){
      const token = this.auth.GetToken();
      // console.log(`current  ${token}`)
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<InterfaceProject[]>('http://localhost:5243/api/Projects', {headers})
  }

  GetProjectById(projId:number): Observable<any>{
    console.log(` ProjectId in service: ${projId}`)
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.get<any>(`http://localhost:5243/api/Projects/${projId}`, {headers})
    return this.http.get<any>(`http://localhost:5243/api/Projects/${projId}?ProjectId=${projId}`, {headers})

  }

  UpdateProject(formData:FormData): Observable<any>{
    console.log('we are in update Project func in service');
    // console.log(`new Project tittle is: ${formData.get('ProjectTitle')}`);
    console.log("update Project")
    formData.forEach((value, key) => { console.log(`${key}:`, value)});
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<InterfaceProject>('http://localhost:5243/api/Projects/'+Number(formData.get('ProjectId')),formData, {headers})
  }

  DeleteProject(projId:Number): Observable<any>{
    console.log(`projId to be  deleted from ProjectService ${projId}`);
    const token = this.auth.GetToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<InterfaceProject>(`http://localhost:5243/api/Projects/${projId}?ProjectId=${projId}`, {headers})
  }



  // signal state
  project = signal<InterfaceProject | null>(null);

  loadProject() {

    // mock API response
    const projectData: InterfaceProject = {
      projectId:0,
      projectTitle:'',
      projectDescription:'',
      projectStatus:'',
      projectDate: new Date(),
      projectPhotoUrl:'',
    };
    this.project.set(projectData);
  }

}

