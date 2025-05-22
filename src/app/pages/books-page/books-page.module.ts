import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule, Routes } from '@angular/router';
import { PricePipe } from '../../pipes/price.pipe';
import { BooksPageComponent } from './books-page.component';

const routes: Routes = [{ path: '', component: BooksPageComponent }];

@NgModule({
  declarations: [
    BooksPageComponent,
    PricePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    RouterModule.forChild(routes)
  ]
})
export class BooksPageModule {}
