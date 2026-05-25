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

export const routes: Routes = [
    {path: '', redirectTo: '**', pathMatch: 'full'},
    {path: 'addmember', component: Addmember, canActivate:[authGuardGuard]},
    {path: 'members', component: MembersList, canActivate:[authGuardGuard]},
    {path: 'detailmember/:id', component: Detailmember, canActivate:[authGuardGuard]},
    {path: 'updatemember/:id', component: Updatemember, canActivate:[authGuardGuard]},
    {path: 'deletemember/:id', component: Deletemember, canActivate:[authGuardGuard]},

    {path: 'login', component: Login},
    {path: 'logout', component: Logout},
    {path: 'register', component: Register}, 
    
    {path: '**', component: Home}, 

];
