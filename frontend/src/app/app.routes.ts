import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard').then((m) => m.DashboardComponent)
  },
  {
    path: 'elderlies',
    loadComponent: () =>
      import('./features/elderlies/pages/elderly-list/elderly-list').then((m) => m.ElderlyListComponent)
  },
  {
    path: 'elderlies/new',
    loadComponent: () =>
      import('./features/elderlies/pages/elderly-create/elderly-create').then((m) => m.ElderlyCreateComponent)
  },
  {
    path: 'elderlies/:id/edit',
    loadComponent: () =>
      import('./features/elderlies/pages/elderly-edit/elderly-edit').then((m) => m.ElderlyEditComponent)
  },
  {
    path: 'volunteers',
    loadComponent: () =>
      import('./features/volunteers/pages/volunteer-list/volunteer-list').then((m) => m.VolunteerListComponent)
  },
  {
    path: 'volunteers/new',
    loadComponent: () =>
      import('./features/volunteers/pages/volunteer-create/volunteer-create').then(
        (m) => m.VolunteerCreateComponent
      )
  },
  {
    path: 'volunteers/:id/edit',
    loadComponent: () =>
      import('./features/volunteers/pages/volunteer-edit/volunteer-edit').then((m) => m.VolunteerEditComponent)
  },
  {
    path: 'walks',
    loadComponent: () =>
      import('./features/walks/pages/walk-list/walk-list').then((m) => m.WalkListComponent)
  },
  { path: '**', redirectTo: '' }
];
