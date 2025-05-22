import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../core/interfaces/book';

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
    { id: 9, title: 'Mistborn', author: 'Brandon Sanderson', year: 2006, genre: 'Fantasy', price: 16 },
    ];
    
  isModalVisible = false;
  isEditMode = false;
  selectedBook?: Book;
  form: FormGroup;
  currentPage = 1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      author: ['', Validators.required],
      year: [null, [Validators.required, this.yearValidator]],
      genre: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }

  yearValidator(control: any) {
    const year = control.value;
    const currentYear = new Date().getFullYear();
    if (!year || year < 1900 || year > currentYear) {
      return { invalidYear: true };
    }
    return null;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.form.reset();
    this.isModalVisible = true;
  }

  openEditModal(book: Book): void {
    this.isEditMode = true;
    this.selectedBook = book;
    this.form.patchValue(book);
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
    const newBook = { ...this.form.value };

    if (this.isEditMode && this.selectedBook) {
      const index = this.books.findIndex(b => b.id === this.selectedBook!.id);
      this.books[index] = { ...this.selectedBook, ...newBook };
    } else {
      newBook.id = Date.now();
      this.books = [...this.books, newBook];
    }

    this.isModalVisible = false;
    this.form.reset();
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.form.reset();
  }

  get title() { return this.form.get('title');}
  get author() { return this.form.get('author');}
  get year() { return this.form.get('year');}
  get genre() { return this.form.get('genre');}
  get price() { return this.form.get('price');}

}
