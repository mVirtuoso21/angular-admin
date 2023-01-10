import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  columns: string[] = ["ID", "Email", "Password", "Name (English)", "Name (Arabic)", "Gender", "Country"];

  constructor(private router: Router, private service: ApiService) { }

  ngOnInit(): void {
    this.users = this.service.getUsers();
  }

  editUser(userId: number): void {
    this.router.navigate(['/editUser'], { queryParams: { 'userId': userId.toString() } });
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
