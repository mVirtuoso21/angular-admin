import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: any;
  hide = true;
  textDirection: Direction = "ltr";

  constructor(private router: Router, private service: ApiService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    if (!this.translateService.currentLang) {
      this.textDirection = "ltr";
    }
    else {
      if (this.translateService.currentLang === "ar-LB") {
        this.textDirection = "rtl";
      }
      else {
        this.textDirection = "ltr";
      }
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goHome(): void {
    let userExists = false;
    let users: User[] = this.service.getUsers();
    users.forEach(user => {
      if (user.email === this.formGroup.controls.email.value && user.password === this.formGroup.controls.password.value) {
        userExists = true;
      }
    });
    if (userExists) {
      this.router.navigate(['/home']);
    }
    else {
      alert("Invalid Credentials!");
    }
  }

  selectLanguage(event: any) {
    this.translateService.use(event);
    if (event === "ar-LB") {
      this.textDirection = "rtl";
    }
    else {
      this.textDirection = "ltr";
    }
  }
}
