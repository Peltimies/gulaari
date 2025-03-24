import { Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'management', component: ManagementComponent }
];
