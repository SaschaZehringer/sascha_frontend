import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageType } from '../types/lanuage.type';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'language';
  private readonly DEFAULT_LANGUAGE: LanguageType = 'de';
  private translateService = inject(TranslateService);

  private languageSubject: BehaviorSubject<LanguageType>;
  public language$: Observable<LanguageType>;

  constructor() {
    // Initialize from localStorage or use default
    const initialLanguage = this.getStoredLanguage();
    this.languageSubject = new BehaviorSubject<LanguageType>(initialLanguage);
    this.language$ = this.languageSubject.asObservable();

    // Set initial language for TranslateService
    this.translateService.use(initialLanguage);
  }

  /**
   * Get the current language value
   */
  getCurrentLanguage(): LanguageType {
    return this.languageSubject.value;
  }

  /**
   * Set a new language and persist to localStorage
   */
  setLanguage(language: LanguageType): void {
    this.languageSubject.next(language);
    localStorage.setItem(this.STORAGE_KEY, language);

    // Update TranslateService when language changes
    this.translateService.use(language);
  }

  /**
   * Get language from localStorage
   */
  private getStoredLanguage(): LanguageType {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return (stored === 'en' || stored === 'de') ? stored : this.DEFAULT_LANGUAGE;
  }
}
