import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { AuthGuardService } from './auth-guard-service';

const routes: Routes = [
  { path: "", component: LoginComponent, },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
