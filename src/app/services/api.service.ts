import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { data } from '../../assets/countries-states-data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem("users") ?? JSON.stringify([]));
  }

  saveUsers(users: User[]): void {
    localStorage.setItem("users", JSON.stringify(users));
  }

  getCountriesMap() {
    return data;
  }
}
