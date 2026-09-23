import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageOption, LanguageService, SupportedLanguage } from './core/services/language.service';
import { MATERIAL_IMPORTS } from './shared/material/material.imports';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly languageService = inject(LanguageService);

  protected readonly title = 'WandelMaatje';
  protected readonly languages: readonly LanguageOption[] = this.languageService.supportedLanguages;

  protected get currentLanguage(): SupportedLanguage {
    return this.languageService.currentLanguage;
  }

  protected changeLanguage(language: SupportedLanguage): void {
    this.languageService.use(language);
  }
}
