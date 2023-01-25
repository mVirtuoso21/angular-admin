import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { CountryCities } from 'src/app/models/country-cities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private service: ApiService, private translate: TranslateService, @Inject(DOCUMENT) private document: Document) { }

  users: User[] = [];
  columns: string[] = ["id", "email", "password", "name.english", "name.arabic", "gender", "country"];
  loggedInUser: any;

  ngOnInit(): void {
    this.users = this.service.getUsers();
    this.loggedInUser = this.users.find(user => user.id === +localStorage.getItem("loggedInUserId")!);
  }

  editUser(userId: number): void {
    this.router.navigate(['/editUser'], { queryParams: { 'userId': userId.toString() } });
  }

  back(): void {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("loggedInUserId", "");
    this.router.navigate(['']);
  }

  userCountries(countriesCitiesArray: CountryCities[]) {
    let stringRep = "";
    countriesCitiesArray.forEach((pair, i) => {
      Object.keys(pair).forEach(key => {
        stringRep += this.translate.instant(pair[key]) + " (" + this.translate.instant(key) + ")" + ((i === countriesCitiesArray.length - 1) ? "" : ", ");
      });
    });
    return stringRep;
  }

  getTranslatedName() {
    if (this.document.getElementsByTagName("html")[0].lang === "ar") {
      return this.loggedInUser.arabicName;
    }
    else {
      return this.loggedInUser.englishName;
    }
    // this.users = this.service.getUsers();
    // this.loggedInUser = this.users.find(user => user.id === parseInt(localStorage.getItem("loggedInUserId") as string));
    // let username = "";
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   if (this.loggedInUser) {
    //     if (event.lang === "en-US") {
    //       username = this.loggedInUser.englishName;
    //     }
    //     else if (event.lang === "ar-LB") {
    //       username = this.loggedInUser.arabicName;
    //     }
    //   }
    //   else {
    //     username = "";
    //   }
    // });
    // return username;
  }
}
