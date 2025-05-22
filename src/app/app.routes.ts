import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'books',
    loadChildren: () => import('./pages/books-page/books-page.module').then(m => m.BooksPageModule)
    },
    { path: '**', redirectTo: 'books' }
];
