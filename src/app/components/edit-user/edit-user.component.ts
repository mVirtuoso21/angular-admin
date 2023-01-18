import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { validateArabicName, validateUniqueCountries } from 'src/app/directives/custom-validators.directive';
import { CountryCities } from 'src/app/models/country-cities';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { CanDeactivateDialogComponent } from './can-deactivate-dialog/can-deactivate-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ApiService, private router: Router, private dialog: MatDialog, private snackbar: MatSnackBar) { }

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
    this.countriesStatesMap = this.service.getCountriesMap();
    let userCountriesControls: FormControl[] = [];

    this.formGroup = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required),
      englishName: new FormControl(this.user.englishName, Validators.required),
      arabicName: new FormControl(this.user.arabicName, { validators: [Validators.required, validateArabicName()], updateOn: "change" },),
      gender: new FormControl(this.user.gender, Validators.required),
      country: new FormArray(userCountriesControls, [Validators.required, validateUniqueCountries()])
    });

    this.user.country.forEach((pair: CountryCities) => {
      Object.keys(pair).forEach(key => {
        let countryStateGroup = new FormGroup({
          countryControl: new FormControl(key, [Validators.required]),
          stateControl: new FormControl(pair[key], [Validators.required])
        });
        this.country.push(countryStateGroup);
      });
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.saved) {
      this.dialog.open(CanDeactivateDialogComponent, {
        height: '100px',
        width: '350px',
      });
      this.snackbar.open("You have unsaved changes.", "OK", { duration: 4000 });
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
      stateControl: new FormControl("Beyrouth", [Validators.required])
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
