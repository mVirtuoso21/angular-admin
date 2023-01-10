import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateArabicName } from 'src/app/directives/custom-validators.directive';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ApiService) { }

  users: User[] = [];
  userId: any;
  saved: boolean = false;
  countriesList: string[] = [];
  formGroup: any;
  user: any;
  hide = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = Number.parseInt(params.userId);
    });
    this.users = this.service.getUsers();
    this.users.forEach(user => {
      if (this.userId === user.id) {
        this.user = user;
      }
    });
    console.log(this.user);
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
      country: new FormArray(userCountriesControls, [Validators.required])
    });
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
    this.country.removeAt(countryIndex)
  }

  editUser() {
    console.log(this.user);
  }

}
