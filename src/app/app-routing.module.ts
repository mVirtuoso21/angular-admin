import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UnsavedGuard } from './components/edit-user/unsaved.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "", component: LoginComponent, },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "editUser", component: EditUserComponent, canDeactivate: [UnsavedGuard] },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
