import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: ApiService, private langService: LanguageService) { }

  formGroup: any;
  hide = true;
  loggedIn: boolean = false;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn") ?? "false");
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goHome(): void {
    let userExists = false;
    let users: User[] = this.service.getUsers();
    let userId = 0;
    users.forEach(user => {
      if (user.email === this.formGroup.controls.email.value && user.password === this.formGroup.controls.password.value) {
        userExists = true;
        userId = user.id;
      }
    });
    if (userExists) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("loggedInUserId", JSON.stringify(userId));
      this.router.navigate(['/home']).then(() => {
        this.langService.changeName();
      });
    }
    else {
      localStorage.setItem("loggedIn", "false");
      alert("Invalid Credentials!");
    }
  }
}
