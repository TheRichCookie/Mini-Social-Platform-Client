import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UkArrayService {
  // To check if two arrays are equal (i.e., contain the same elements in the same order):
  public arraysEqual(arr1: string[], arr2: string[]): boolean {
    return (
      arr1.length === arr2.length &&
      arr1.every((val, index) => val === arr2[index])
    );
  }

  // If you want to check if two arrays contain the same elements, regardless of order:
  public arraysHaveSameElements(arr1: string[], arr2: string[]): boolean {
    const sortedArr1 = arr1.slice().sort().join(',');
    const sortedArr2 = arr2.slice().sort().join(',');

    return sortedArr1 === sortedArr2;
  }

  // If you just want to check if two arrays have the same elements, ignoring duplicates and order, you can use sets:
  public setsHaveSameElements(arr1: string[], arr2: string[]): boolean {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    if (set1.size !== set2.size) {
      return false;
    }

    for (const elem of set1) {
      if (!set2.has(elem)) {
        return false;
      }
    }

    return true;
  }
}

// ----------------------------------------------------------------
// const array1 = ['apple', 'banana', 'cherry'];
// const array2 = ['apple', 'banana', 'cherry'];
// const array3 = ['apple', 'banana'];

// console.log(arraysEqual(array1, array2)); // true
// console.log(arraysEqual(array1, array3)); // false
// ----------------------------------------------------------------
// const array1 = ['apple', 'banana', 'cherry'];
// const array2 = ['cherry', 'banana', 'apple'];

// console.log(arraysHaveSameElements(array1, array2)); // true
// ----------------------------------------------------------------
// const array1 = ['apple', 'banana', 'cherry', 'banana'];
// const array2 = ['cherry', 'banana', 'apple'];

// console.log(setsHaveSameElements(array1, array2)); // true
// ----------------------------------------------------------------
