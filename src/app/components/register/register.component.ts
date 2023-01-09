import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: any;
  hide = true;
  countriesList: string[] = [];
  users: User[] = [];

  constructor(private router: Router, private service: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      englishName: new FormControl(null, Validators.required),
      arabicName: new FormControl(null, [Validators.required, this.validateArabicName()]),
      gender: new FormControl("Male", Validators.required),
      country: new FormControl(null, Validators.required),
    });
    this.users = this.service.getUsers();
    this.countriesList = this.service.getCountries();
  }

  validateArabicName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: string = control.value;
      if (!value) {
        return null;
      }
      let isArabic = true;
      let regexp = /[\u0600-\u06ff\s]/;
      for (let char of value) {
        isArabic &&= regexp.test(char);
      }
      return !isArabic ? { arabic: true } : null;
    }
  }

  registerUser(): void {
    if (this.formGroup.valid) {
      this.users.push(new User(this.formGroup.controls["email"].value, this.formGroup.controls["password"].value, this.formGroup.controls["englishName"].value, this.formGroup.controls["arabicName"].value, this.formGroup.controls["gender"].value, this.formGroup.controls["country"].value));
      this.service.saveUsers(this.users);
      this.back();
    }
  }

  back(): void {
    this.router.navigate(['..']);
  }
}