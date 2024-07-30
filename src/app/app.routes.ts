import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AliyarComponent } from './aliyar/aliyar.component';
import { AuthGuard } from './guards/auth.guard';
import { ChulliyarComponent } from './chulliyar/chulliyar.component';
import { MalampuzhaComponent } from './malampuzha/malampuzha.component';
import { KanhirapuzhaComponent } from './kanhirapuzha/kanhirapuzha.component';
import { MeenkaraComponent } from './meenkara/meenkara.component';
import { MangalamComponent } from './mangalam/mangalam.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path: 'malampuzha', component:MalampuzhaComponent,canActivate: [AuthGuard],},
    {path: 'aliyar', component:AliyarComponent,canActivate: [AuthGuard],},
    {path: 'meenkara', component:MeenkaraComponent,canActivate: [AuthGuard],},
    {path: 'kanhirapuzha', component:KanhirapuzhaComponent,canActivate: [AuthGuard],},
    {path: 'mangalam', component:MangalamComponent,canActivate: [AuthGuard],},
    {path: 'chulliyar', component:ChulliyarComponent,canActivate: [AuthGuard],},
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          {path:'Aliyar', component:AliyarComponent,canActivate:[AuthGuard]},
          {path: 'Chulliyar', component:ChulliyarComponent,canActivate:[AuthGuard]},
          {path:'Kanhirapuzha', component:KanhirapuzhaComponent,canActivate:[AuthGuard]},
          {path:'Malampuzha', component:MalampuzhaComponent,canActivate:[AuthGuard]},
          {path:'Mangalam', component:MangalamComponent,canActivate:[AuthGuard]},
          {path: 'Meenkara', component:MeenkaraComponent,canActivate:[AuthGuard]},
        ]
      },
    
    {path:'**',redirectTo:'/login'},
];
