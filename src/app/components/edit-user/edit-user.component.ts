import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { validateArabicName, validateUniqueStates } from 'src/app/directives/validators.directive';
import { CanComponentDeactivate } from 'src/app/guards/can-component-deactivate.guard';
import { CountryCities } from 'src/app/models/country-cities';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { CanDeactivateDialogComponent } from './can-deactivate-dialog/can-deactivate-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, CanComponentDeactivate {

  constructor(private route: ActivatedRoute, private service: ApiService, private router: Router, private dialog: MatDialog, private snackbar: MatSnackBar, private translate: TranslateService) { }

  users: User[] = [];
  userId: any;
  saved: boolean = false;
  countriesStatesMap: CountryCities = {};
  formGroup: any;
  user: any;
  hide = true;
  index: number = -1;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = Number.parseInt(params.userId);
    });
    this.users = this.service.getUsers();
    this.users.forEach((user, i) => {
      if (this.userId === user.id) {
        this.user = user;
        this.index = i;
      }
    });
    // in case user id was not found, redirect user home
    if (this.index === -1) {
      alert("User not found.");
      this.saved = true;
      this.router.navigate(['home']);
      return;
    }
    this.countriesStatesMap = this.service.getCountriesMap();
    let userCountriesControls: FormControl[] = [];

    this.formGroup = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required),
      englishName: new FormControl(this.user.englishName, Validators.required),
      arabicName: new FormControl(this.user.arabicName, { validators: [Validators.required, validateArabicName()], updateOn: "change" },),
      gender: new FormControl(this.user.gender, Validators.required),
      country: new FormArray(userCountriesControls, [Validators.required])
    });

    this.user.country.forEach((pair: CountryCities) => {
      Object.keys(pair).forEach(key => {
        let countryStateGroup = new FormGroup({
          countryControl: new FormControl(key, [Validators.required]),
          stateControl: new FormControl(pair[key], [Validators.required, validateUniqueStates(this.country)])
        });
        this.country.push(countryStateGroup);
      });
    });
  }

  canDeactivate(): boolean {
    if (!this.saved) {
      this.dialog.open(CanDeactivateDialogComponent, {
        height: '100px',
        width: '350px',
      });
      this.snackbar.open(this.translate.instant("unsavedChanges"), this.translate.instant("OK"), { duration: 4000, direction: this.translate.currentLang === "ar-LB" ? "rtl" : "ltr" });
      return false;
    }
    return true;
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
  }

  removeCountry(countryIndex: number) {
    this.country.removeAt(countryIndex);
  }

  resetState(i: any) {
    this.country.controls[i].get("stateControl")?.setValue(null);
  }

  editUser() {
    this.saved = true;
    if (this.formGroup.valid) {
      this.users[this.index].email = this.formGroup.controls["email"].value;
      this.users[this.index].password = this.formGroup.controls["password"].value;
      this.users[this.index].englishName = this.formGroup.controls["englishName"].value;
      this.users[this.index].arabicName = this.formGroup.controls["arabicName"].value;
      this.users[this.index].gender = this.formGroup.controls["gender"].value;
      let userCountriesStates: CountryCities[] = [];
      this.formGroup.controls["country"].value.forEach((item: any) => {
        let pair: CountryCities = {};
        pair[item.countryControl] = item.stateControl;
        userCountriesStates.push(pair);
      });
      this.users[this.index].country = userCountriesStates;
      this.service.saveUsers(this.users);
      this.router.navigate(['/home']);
    }
  }
}
