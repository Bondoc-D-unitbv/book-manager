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
    { id: 1, title: 'Sword of Destiny', author: 'Andrzej Sapkowski', year: 1992, genre: 'Fantasy', price: 14 },
    { id: 2, title: 'Blood of Elves', author: 'Andrzej Sapkowski', year: 1994, genre: 'Fantasy', price: 14 },
    { id: 3, title: 'Time of Contempt', author: 'Andrzej Sapkowski', year: 1995, genre: 'Fantasy', price: 14 },
    { id: 4, title: 'Baptism of Fire', author: 'Andrzej Sapkowski', year: 1996, genre: 'Fantasy', price: 14 },
    { id: 5, title: 'The Tower of the Swallow', author: 'Andrzej Sapkowski', year: 1997, genre: 'Fantasy', price: 14 },
    { id: 6, title: 'The Lady of the Lake', author: 'Andrzej Sapkowski', year: 1999, genre: 'Fantasy', price: 14 },
    { id: 7, title: 'Season of Storms', author: 'Andrzej Sapkowski', year: 2013, genre: 'Fantasy', price: 14 },
    { id: 8, title: 'Wheel of Time', author: 'Robert Jordan', year: 1990, genre: 'Fantasy', price: 18 },

    { id: 9, title: 'Mistborn', author: 'Brandon Sanderson', year: 2006, genre: 'Fantasy', price: 16 },
    { id: 10, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy', price: 10 },
    { id: 11, title: 'LOTR', author: 'J.R.R. Tolkien', year: 1954, genre: 'Fantasy', price: 25 },
    { id: 12, title: 'Harry Potter', author: 'J.K. Rowling', year: 1997, genre: 'Fantasy', price: 12 },
    { id: 13, title: 'Dune', author: 'Frank Herbert', year: 1965, genre: 'Sci-fi', price: 20 },
    { id: 14, title: 'Name of the Wind', author: 'Patrick Rothfuss', year: 2007, genre: 'Fantasy', price: 17 },
    { id: 15, title: 'Eragon', author: 'Christopher Paolini', year: 2002, genre: 'Fantasy', price: 11 },

    { id: 16, title: 'The Hot Rock (Dortmunder #1)', author: 'Donald E. Westlake', year: 1970, genre: 'Crime/Comedy', price: 12 },
    { id: 17, title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', year: 1954, genre: 'Fantasy', price: 13 },
    { id: 18, title: 'The Two Towers', author: 'J.R.R. Tolkien', year: 1954, genre: 'Fantasy', price: 13 },
    { id: 19, title: 'The Return of the King', author: 'J.R.R. Tolkien', year: 1955, genre: 'Fantasy', price: 13 },
    { id: 20, title: 'No Country for Old Men', author: 'Cormac McCarthy', year: 2005, genre: 'Thriller', price: 15 },
  ];

  listOfDisplayData: Book[] = [];

  ngOnInit() {
    this.listOfDisplayData = [...this.books];
  }

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
          this.books = [...this.books]; 
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

  onPageChange(pageIndex: number): void {
  }

  onCurrentPageDataChange(data: readonly Book[]): void {
    this.listOfDisplayData = [...data];
  }

}
