import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';
import { BottomNavigation } from './bottom-navigation/bottom-navigation';


@Component({
  selector: 'app-layout',
  standalone: true,
imports: [
  Navbar,
  BottomNavigation,
  RouterOutlet
],
  templateUrl: './layout.html'
})


export class LayoutComponent {}