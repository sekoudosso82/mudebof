import { Routes } from '@angular/router';
import { authGuardGuard } from './auth-guard-guard';
import { Home } from './home/home';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { Register } from './register/register';
import { MembersList } from './members/members-list/members-list';
import { Detailmember } from './members/detailmember/detailmember';
import { Updatemember } from './members/updatemember/updatemember';
import { Deletemember } from './members/deletemember/deletemember';
import { Addmember } from './members/addmember/addmember';
import { Reglements } from './reglements/reglements/reglements';
import { Projects } from './projects/projects/projects';
import { Activities } from './activities/activities/activities';
import { Addactivity } from './activities/addactivity/addactivity';
import { Detailactivity } from './activities/detailactivity/detailactivity';
import { Updateactivity } from './activities/updateactivity/updateactivity';
import { Deleteactivity } from './activities/deleteactivity/deleteactivity';

export const routes: Routes = [
    {path: '', redirectTo: '**', pathMatch: 'full'},
    {path: 'addmember', component: Addmember, canActivate:[authGuardGuard]},
    {path: 'members', component: MembersList, canActivate:[authGuardGuard]},
    {path: 'detailmember/:id', component: Detailmember, canActivate:[authGuardGuard]},
    {path: 'updatemember/:id', component: Updatemember, canActivate:[authGuardGuard]},
    {path: 'deletemember/:id', component: Deletemember, canActivate:[authGuardGuard]},

    {path: 'reglements', component: Reglements, canActivate:[authGuardGuard]},

    {path: 'projects', component: Projects, canActivate:[authGuardGuard]},

    {path: 'activities', component: Activities, canActivate:[authGuardGuard]},
    {path: 'addactivity', component: Addactivity, canActivate:[authGuardGuard]},
    {path: 'detailactivity/:id', component: Detailactivity, canActivate:[authGuardGuard]},
    {path: 'updatectivity/:id', component: Updateactivity, canActivate:[authGuardGuard]},
    {path: 'deleteactivity/:id', component: Deleteactivity, canActivate:[authGuardGuard]},
    


    {path: 'login', component: Login},
    {path: 'logout', component: Logout},
    {path: 'register', component: Register}, 
    
    {path: '**', component: Home}, 

];
