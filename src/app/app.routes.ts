import { Routes } from '@angular/router';
import { BookFormComponent } from './features/book-form/book-form.component';

export const routes: Routes = [
    {
    path: 'books',
    loadChildren: () => import('./features/books-page/books-page.module').then(m => m.BooksPageModule)
    },
    { path: '**', redirectTo: 'books' },
    { path: 'add-book', component: BookFormComponent },
];
