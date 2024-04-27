import { Pipe, PipeTransform,Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
@Pipe({ name: 'CapitalizePipe' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}