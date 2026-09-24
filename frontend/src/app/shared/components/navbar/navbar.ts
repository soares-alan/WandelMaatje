import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MATERIAL_IMPORTS } from '../../material/material.imports';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  readonly title = 'WandelMaatje';

  private readonly languageService = inject(LanguageService);

  readonly languages = this.languageService.supportedLanguages;

  get currentLanguage(): string {
    return this.languageService.currentLanguage;
  }

  changeLanguage(languageCode: string): void {
   this.languageService.use(languageCode as 'en' | 'nl');
  }
}