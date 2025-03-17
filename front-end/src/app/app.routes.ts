import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'pages', pathMatch: 'full'
    },
    {
        path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: '**', redirectTo: 'pages/not-found'
    }
];
