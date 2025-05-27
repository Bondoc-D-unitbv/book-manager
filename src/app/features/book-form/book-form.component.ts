import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class BookFormComponent { 
  @Input() form!: FormGroup;
}
