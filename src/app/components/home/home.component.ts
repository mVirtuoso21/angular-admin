import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  columns: string[] = ["id", "email", "password", "name.english", "name.arabic", "gender", "country"];
  loggedInUser: any;

  constructor(private router: Router, private service: ApiService, private translate: TranslateService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.users = this.service.getUsers();
    this.loggedInUser = this.users.find(user => user.id === parseInt(localStorage.getItem("loggedInUserId") as string));
  }

  editUser(userId: number): void {
    this.router.navigate(['/editUser'], { queryParams: { 'userId': userId.toString() } });
  }

  back(): void {
    localStorage.setItem("loggedIn", "false");
    this.router.navigate(['']);
  }

  userCountries(countriesArray: string[]) {
    return countriesArray.map(c => this.translate.instant(c));
  }

  getTranslatedName() {
    if (this.document.getElementsByTagName("html")[0].lang === "ar") {
      return this.loggedInUser.arabicName;
    }
    else {
      return this.loggedInUser.englishName;
    }
  }
}
