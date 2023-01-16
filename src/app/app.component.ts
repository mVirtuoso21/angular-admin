import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'login-register';
  loggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn") ?? "false");
    if (this.loggedIn) {
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['login']);
    }
  }
}
