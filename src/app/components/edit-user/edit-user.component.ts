import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { validateArabicName, validateUniqueCountries } from 'src/app/directives/custom-validators.directive';
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
  countriesList: string[] = [];
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
    this.countriesList = this.service.getCountries();
    let userCountriesControls: FormControl[] = [];

    for (let c of this.user.country) {
      let control = new FormControl("");
      control.setValue(c);
      userCountriesControls.push(control);
    }
    this.formGroup = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required),
      englishName: new FormControl(this.user.englishName, Validators.required),
      arabicName: new FormControl(this.user.arabicName, { validators: [Validators.required, validateArabicName()], updateOn: "change" },),
      gender: new FormControl(this.user.gender, Validators.required),
      country: new FormArray(userCountriesControls, [Validators.required, validateUniqueCountries()])
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
    let control = new FormControl("");
    control.setValue("Lebanon");
    this.country.push(control);
  }

  removeCountry(countryIndex: number) {
    this.country.removeAt(countryIndex);
  }

  editUser() {
    this.saved = true;
    if (this.formGroup.valid) {
      this.users[this.index].email = this.formGroup.controls["email"].value;
      this.users[this.index].password = this.formGroup.controls["password"].value;
      this.users[this.index].englishName = this.formGroup.controls["englishName"].value;
      this.users[this.index].arabicName = this.formGroup.controls["arabicName"].value;
      this.users[this.index].gender = this.formGroup.controls["gender"].value;
      this.users[this.index].country = this.formGroup.controls["country"].value;
      this.service.saveUsers(this.users);
      this.router.navigate(['/home']);
    }
  }
}
