import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { validateArabicName } from 'src/app/directives/custom-validators.directive';
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
  addedCountry = false;
  formSubmitted = false;

  constructor(private router: Router, private service: ApiService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      englishName: new FormControl(null, Validators.required),
      arabicName: new FormControl(null, { validators: [Validators.required, validateArabicName()], updateOn: "change" },),
      gender: new FormControl("Male", Validators.required),
      country: new FormArray([], [Validators.required]),
    });
    this.users = this.service.getUsers();
    this.countriesList = this.service.getCountries();
  }

  registerUser(): void {
    this.formSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.users.push(new User(this.formGroup.controls["email"].value, this.formGroup.controls["password"].value, this.formGroup.controls["englishName"].value, this.formGroup.controls["arabicName"].value, this.formGroup.controls["gender"].value, this.formGroup.controls["country"].value));
      this.service.saveUsers(this.users);
      this.back();
    }
  }

  get country() {
    return this.formGroup.controls["country"] as FormArray;
  }

  addCountry() {
    let control = new FormControl("");
    control.setValue("Lebanon");
    this.country.push(control);
    this.addedCountry = true;
  }

  removeCountry(countryIndex: number) {
    this.country.removeAt(countryIndex);
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
