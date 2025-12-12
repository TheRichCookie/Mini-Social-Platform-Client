import type {PipeTransform} from '@angular/core';
import {Pipe} from '@angular/core';

@Pipe({
  name: 'toNumber',
  standalone: true,
})
export class UkToNumberPipe implements PipeTransform {
  public transform(value: string | null | undefined): number {
    return value ? Number(value) : 0;
  }
}
