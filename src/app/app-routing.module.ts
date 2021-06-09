import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './admin.guard';
import { AddPasswordComponent } from './add-password/add-password.component';
import { ListPasswordComponent } from './list-password/list-password.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', canActivate: [AdminGuard], component: DashboardComponent },
  { path: 'add-password', canActivate: [AdminGuard], component: AddPasswordComponent },
  { path: 'list-password', canActivate: [AdminGuard], component: ListPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', canActivate: [AdminGuard], component: LogoutComponent },
  //This last two lines should be last in order for the above to work first
  //NOTE: You can only declare redirectTo onces
  //This will redirect if path is empty or home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //This will fire if path above is not meet
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
