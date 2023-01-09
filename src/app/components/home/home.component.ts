import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CellValueChangedEvent } from 'ag-grid-community';
import { User } from 'src/app/models/user.model';
// import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];
  columnDefs = [
    { field: 'id', sortable: true },
    { field: 'email', sortable: true, editable: true },
    { field: 'password', sortable: true, editable: true },
    { field: 'englishName', sortable: true, editable: true },
    { field: 'arabicName', sortable: true, editable: true },
    { field: 'gender', sortable: true, editable: true },
    { field: 'country', sortable: true, editable: true },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem("users") ?? JSON.stringify([]));
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    let newUser = event.data;
    this.users.map(function (user) {
      return newUser.id === user.id ? newUser : user;
    });
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
