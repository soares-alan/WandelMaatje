import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'en' | 'nl';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  flag: string;
}

const LANGUAGE_STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' }
];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly defaultLanguage = DEFAULT_LANGUAGE;
  readonly supportedLanguages = SUPPORTED_LANGUAGES;

  init(): void {
    const savedLanguage = this.readSavedLanguage();
    this.translate.use(savedLanguage ?? this.defaultLanguage).subscribe();
  }

  get currentLanguage(): SupportedLanguage {
    return (this.translate.currentLang() as SupportedLanguage) ?? this.defaultLanguage;
  }

  use(language: SupportedLanguage): void {
    this.translate.use(language).subscribe();
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }

  private readSavedLanguage(): SupportedLanguage | null {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const isSupported = SUPPORTED_LANGUAGES.some((language) => language.code === saved);
    return isSupported ? (saved as SupportedLanguage) : null;
  }
}
