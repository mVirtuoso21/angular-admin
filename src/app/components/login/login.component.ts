import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private service: ApiService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
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
}
