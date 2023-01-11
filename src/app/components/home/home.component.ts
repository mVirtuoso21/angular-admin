import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  columns: string[] = ["id", "email", "password", "name.english", "name.arabic", "gender", "country"];
  textDirection: Direction = "ltr";

  constructor(private router: Router, private service: ApiService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.users = this.service.getUsers();
    if (!this.translateService.currentLang) {
      this.textDirection = "ltr";
    }
    else {
      if (this.translateService.currentLang === "ar-LB") {
        this.textDirection = "rtl";
      }
      else {
        this.textDirection = "ltr";
      }
    }
  }

  editUser(userId: number): void {
    this.router.navigate(['/editUser'], { queryParams: { 'userId': userId.toString() } });
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
