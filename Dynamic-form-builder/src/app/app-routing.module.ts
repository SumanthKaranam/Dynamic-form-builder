import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RoleGuard } from './service/role.guard';
import { SignupComponent } from './pages/signup/signup.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'form-builder',
    loadChildren: () => import('./components/form-builder/form-builder.module').then(m => m.FormBuilderModule),
    canActivate: [RoleGuard],
    data: { role: 'admin' }, // Only accessible by admin
  },
  {
    path: 'form-list',
    loadChildren: () => import('./components/form-list/form-list.module').then(m => m.FormListModule),
    canActivate: [RoleGuard],
    data: { role: 'user' }, // Only accessible by user
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, // Redirect unknown routes to login
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
