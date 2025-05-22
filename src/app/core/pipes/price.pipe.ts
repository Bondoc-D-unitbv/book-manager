import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priceFormat' })
export class PricePipe implements PipeTransform {
  transform(value: number): string {
    return value ? `$${value.toFixed(2)}` : 'N/A';
  }
}
