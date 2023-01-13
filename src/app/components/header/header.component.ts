import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private translateService: TranslateService) { }

  htmlTag: any;
  languageSelectorDiv: any;

  ngOnInit(): void {
    let language = localStorage.getItem("language") ?? "en-US";
    this.htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    this.htmlTag.dir = language === "ar-LB" ? "rtl" : "ltr";
    this.htmlTag.lang = language === "ar-LB" ? "ar" : "en";
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
    this.languageSelectorDiv = this.document.getElementById("languageSelectorDiv") as HTMLDivElement;
    this.languageSelectorDiv.style.setProperty("float", this.htmlTag.dir === "rtl" ? "left" : "right");
  }
  selectLanguage(event: any) {
    this.htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    this.htmlTag.dir = event === "ar-LB" ? "rtl" : "ltr";
    this.htmlTag.lang = event === "ar-LB" ? "ar" : "en";
    this.languageSelectorDiv = this.document.getElementById("languageSelectorDiv") as HTMLDivElement;
    this.languageSelectorDiv.style.setProperty("float", this.htmlTag.dir === "rtl" ? "left" : "right");
    this.translateService.setDefaultLang(event);
    this.translateService.use(event);
    localStorage.setItem("language", event);
  }
}
