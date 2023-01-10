import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CellValueChangedEvent } from 'ag-grid-community';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
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
    {
      field: 'gender', sortable: true, editable: true, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Male', 'Female'],
      }
    },
    { field: 'country', sortable: true, editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: this.service.getCountries() } },
  ];

  constructor(private router: Router, private service: ApiService) { }

  ngOnInit(): void {
    this.users = this.service.getUsers();
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    let newUser = event.data;
    this.users.map(function (user) {
      return newUser.id === user.id ? newUser : user;
    });
    this.service.saveUsers(this.users);
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
