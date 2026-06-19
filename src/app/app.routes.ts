import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login';

import { BookList } from './pages/book-list/book-list';
import { BookForm } from './pages/book-form/book-form';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'books',
    component: BookList
  },

  {
    path: 'books/new',
    component: BookForm
  },

  {
    path: 'books/edit/:id',
    component: BookForm
  }

];