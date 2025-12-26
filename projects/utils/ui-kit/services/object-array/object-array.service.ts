import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UkObjectArrayService {
  public arrayObjectPropertiesChanger(
    array: Array<Record<string, object>>,
    propertyName: string,
    value: object,
  ): void {
    array.forEach((item) => {
      item[propertyName] = value;
    });
  }
}
