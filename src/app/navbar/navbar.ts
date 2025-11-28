import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageType } from '../types/lanuage.type';
import { LanguageService } from '../services/language.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  private languageService = inject(LanguageService);

  menuOpen = false;
  isLightMode = false;
  language: LanguageType = 'de';

  ngOnInit(): void {
    // Subscribe to language changes from the service
    this.languageService.language$.subscribe(lang => {
      this.language = lang;
      this.updateBodyLanguageClass();
    });

    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      this.setLightMode(true);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleLanguage(): void {
    const newLanguage: LanguageType = this.language === 'de' ? 'en' : 'de';
    this.languageService.setLanguage(newLanguage);
  }

  toggleTheme(): void {
    this.setLightMode(!this.isLightMode);
    localStorage.setItem('theme', this.isLightMode ? 'light' : 'dark');
  }

  private updateBodyLanguageClass(): void {
    const body = document.body;
    body.classList.remove('language');
    body.classList.add('language');
  }

  private setLightMode(enable: boolean): void {
    this.isLightMode = enable;
    const body = document.body;
    if (enable) {
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
    }
  }
}
