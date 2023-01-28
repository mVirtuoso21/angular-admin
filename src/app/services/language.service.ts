import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  private loginSubject = new Subject<any>();

  changeName() {
    this.loginSubject.next();
  }

  loginSubjectAsObservable() {
    return this.loginSubject.asObservable();
  }
}
