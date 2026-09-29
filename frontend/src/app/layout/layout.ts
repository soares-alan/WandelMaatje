import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    Navbar,
    RouterOutlet
  ],
  templateUrl: './layout.html'
})


export class LayoutComponent {}