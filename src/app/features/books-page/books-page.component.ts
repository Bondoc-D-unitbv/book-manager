import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../core/interfaces/book';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent {
  books: Book[] = [
    { id: 1, title: 'The Witcher', author: 'Andrzej Sapkowski', year: 1992, genre: 'Fantasy', price: 15 },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy', price: 10 },
    { id: 3, title: 'LOTR', author: 'J.R.R. Tolkien', year: 1954, genre: 'Fantasy', price: 25 },
    { id: 4, title: 'Harry Potter', author: 'J.K. Rowling', year: 1997, genre: 'Fantasy', price: 12 },
    { id: 5, title: 'Dune', author: 'Frank Herbert', year: 1965, genre: 'Sci-fi', price: 20 },
    { id: 6, title: 'Name of the Wind', author: 'Patrick Rothfuss', year: 2007, genre: 'Fantasy', price: 17 },
    { id: 7, title: 'Eragon', author: 'Christopher Paolini', year: 2002, genre: 'Fantasy', price: 11 },
    { id: 8, title: 'Wheel of Time', author: 'Robert Jordan', year: 1990, genre: 'Fantasy', price: 18 },
    { id: 9, title: 'Mistborn', author: 'Brandon Sanderson', year: 2006, genre: 'Fantasy', price: 16 }
  ];

  constructor(private fb: FormBuilder, private modal: NzModalService) {}

  private yearValidator = (control: any) => {
    const year = control.value;
    const currentYear = new Date().getFullYear();
    if (!year || year < 1900 || year > currentYear) {
      return { invalidYear: true };
    }
    return null;
  };

  openFormModal(book?: Book): void {
    const isEditMode = !!book;

    const form: FormGroup = this.fb.group({
      title: [book?.title || '', [Validators.required, Validators.maxLength(30)]],
      author: [book?.author || '', Validators.required],
      year: [book?.year || null, [Validators.required, this.yearValidator]],
      genre: [book?.genre || '', Validators.required],
      price: [book?.price || null, [Validators.required, Validators.min(1)]]
    });

    const modalRef = this.modal.create({
      nzTitle: isEditMode ? 'Edit Book' : 'Add Book',
      nzContent: BookFormComponent,
      nzData: { form },
      nzOnOk: () => {
        if (form.invalid) {
          form.markAllAsTouched();
          return false;
        }

        const newBook = { ...form.value };

        if (isEditMode && book) {
          const index = this.books.findIndex(b => b.id === book.id);
          this.books[index] = { ...book, ...newBook };
        } else {
          newBook.id = Date.now();
          this.books = [...this.books, newBook];
        }
        return true;
      }
    });
  }

  openAddModal(): void {
    this.openFormModal();
  }

  openEditModal(book: Book): void {
    this.openFormModal(book);
  }
}
