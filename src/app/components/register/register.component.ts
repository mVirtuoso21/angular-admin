import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateArabicName, validateUniqueStates } from 'src/app/directives/validators.directive';
import { CountryCities } from 'src/app/models/country-cities';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: ApiService) { }

  formGroup: any;
  hide = true;
  users: User[] = [];
  addedCountry = false;
  formSubmitted = false;
  countriesStatesMap: CountryCities = {};

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
    this.countriesStatesMap = this.service.getCountriesMap();
  }

  registerUser(): void {
    this.formSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      let userCountriesStates: CountryCities[] = [];
      this.formGroup.controls["country"].value.forEach((item: any) => {
        let pair: CountryCities = {};
        pair[item.countryControl] = item.stateControl;
        userCountriesStates.push(pair);
      });
      this.users.push(new User(this.formGroup.controls["email"].value, this.formGroup.controls["password"].value, this.formGroup.controls["englishName"].value, this.formGroup.controls["arabicName"].value, this.formGroup.controls["gender"].value, userCountriesStates));
      this.service.saveUsers(this.users);
      this.back();
    }
  }

  get country() {
    return this.formGroup.controls["country"] as FormArray;
  }

  addCountry() {
    let countryStateGroup = new FormGroup({
      countryControl: new FormControl("Lebanon", [Validators.required]),
      stateControl: new FormControl("Beyrouth", [Validators.required, validateUniqueStates(this.country)])
    });
    this.country.push(countryStateGroup);
    this.addedCountry = true;
  }

  removeCountry(countryIndex: number) {
    this.country.removeAt(countryIndex);
  }

  resetState(i: any) {
    this.country.controls[i].get("stateControl")?.setValue(null);
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
