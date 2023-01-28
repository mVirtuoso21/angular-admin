import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService, private service: ApiService, private langService: LanguageService) { }

  htmlTag: any;
  languageSelectorDiv: any;

  users: User[] = [];
  loggedInUser: any = {};
  username = "";

  ngOnInit(): void {
    let language = localStorage.getItem("language") ?? "en-US";
    this.htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    this.htmlTag.dir = language === "ar-LB" ? "rtl" : "ltr";
    this.htmlTag.lang = language === "ar-LB" ? "ar" : "en";
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.languageSelectorDiv = this.document.getElementById("languageSelectorDiv") as HTMLDivElement;
    this.languageSelectorDiv.style.setProperty("float", this.htmlTag.dir === "rtl" ? "left" : "right");
    this.getUsername();
    this.langService.loginSubjectAsObservable().subscribe(() => {
      this.getUsername();
    });
  }

  selectLanguage(event: any) {
    this.htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    this.htmlTag.dir = event === "ar-LB" ? "rtl" : "ltr";
    this.htmlTag.lang = event === "ar-LB" ? "ar" : "en";
    this.languageSelectorDiv = this.document.getElementById("languageSelectorDiv") as HTMLDivElement;
    this.languageSelectorDiv.style.setProperty("float", this.htmlTag.dir === "rtl" ? "left" : "right");
    this.translate.setDefaultLang(event);
    this.translate.use(event);
    localStorage.setItem("language", event);
  }

  getUsername() {
    // get username on init
    if (!localStorage.getItem("loggedInUserId")) {
      this.username = "";
      return;
    }
    this.users = this.service.getUsers();
    this.loggedInUser = this.users.find(user => user.id === parseInt(localStorage.getItem("loggedInUserId") as string));
    let curLang = this.translate.currentLang;
    if (curLang == "ar-LB") {
      this.username = this.translate.instant('user') + " " + this.loggedInUser.arabicName;
    }
    else if (curLang === "en-US") {
      this.username = this.translate.instant('user') + " " + this.loggedInUser.englishName;
    }
    // get username on language change
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (!localStorage.getItem("loggedInUserId")) {
        return;
      }
      if (this.loggedInUser) {
        if (event.lang === "en-US") {
          this.username = this.translate.instant('user') + " " + this.loggedInUser.englishName;
        }
        else if (event.lang === "ar-LB") {
          this.username = this.translate.instant('user') + " " + this.loggedInUser.arabicName;
        }
      }
      else {
        this.username = "";
      }
    });
  }
}
