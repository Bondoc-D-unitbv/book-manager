import { Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule
  ]
})
export class BookFormComponent {
  form: FormGroup;

  constructor(@Inject(NZ_MODAL_DATA) public data: { form: FormGroup }) {
    this.form = data.form;
  }
}
