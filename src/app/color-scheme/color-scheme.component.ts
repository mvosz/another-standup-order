import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-color-scheme',
  templateUrl: './color-scheme.component.html',
  styleUrls: ['./color-scheme.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ColorSchemeComponent implements OnInit {

  onToggleColorScheme(): void {
    let body = document.getElementsByTagName('body')[0];
    const hasClass = body.classList.contains('dark');

    if(hasClass) {
      localStorage.setItem('darkMode', JSON.stringify(false));
      body.classList.remove("dark");
    } else {
      localStorage.setItem('darkMode', JSON.stringify(true));
      body.classList.add("dark");
    }

  }

  ngOnInit(): void {
    const userPrefersDarkModeBySystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkModeSetting: boolean = localStorage.getItem('darkMode')
      ? JSON.parse(localStorage.getItem('darkMode')!)
      : userPrefersDarkModeBySystem;

    localStorage.setItem('darkMode', JSON.stringify(darkModeSetting));

    let body = document.getElementsByTagName('body')[0];
    if(darkModeSetting) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }

}
