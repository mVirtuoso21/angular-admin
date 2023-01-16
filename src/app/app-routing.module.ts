import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CanComponentDeactivateGuard } from './guards/can-component-deactivate.guard';

const routes: Routes = [
  { path: "", component: AppComponent, },
  { path: "login", component: LoginComponent, },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "editUser", component: EditUserComponent, canDeactivate: [CanComponentDeactivateGuard] },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
