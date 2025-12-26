import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UkNumberService {
  public isNumber(value: unknown): boolean {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  public isNumberAndNotNegative(value: unknown): boolean {
    return typeof value === 'number' && value >= 0;
  }

  public isNumberAndGreaterThanZero(value: unknown): boolean {
    return typeof value === 'number' && value > 0;
  }

  public canBeConvertedToNumber(value: unknown): boolean {
    return !Number.isNaN(parseFloat(value as string)) && Number.isFinite(value);
  }

  public isValidEpoch(epoch: number): boolean {
    return (
      typeof epoch === 'number' &&
      !Number.isNaN(epoch) &&
      epoch > 0 &&
      Number.isFinite(epoch)
    );
  }

  public convertToFarsiNumbers(input: number | string): string {
    const farsiDigits: Record<string, string> = {
      '0': '۰',
      '1': '۱',
      '2': '۲',
      '3': '۳',
      '4': '۴',
      '5': '۵',
      '6': '۶',
      '7': '۷',
      '8': '۸',
      '9': '۹',
    };

    // Convert the input to a string, if it's a number
    const inputString = input.toString();

    // Replace each English numeral with its Farsi equivalent
    return inputString.replaceAll(/[0-9]/g, (digit) => farsiDigits[digit]);
  }

  public convertToEnglishNumbers(input: string | null): string | null {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (input === null) {
      return null;
    }

    const INPUT = String(input);

    return INPUT.split('')
      .map((char) => {
        const index = persianNumbers.indexOf(char);

        return index > -1 ? englishNumbers[index] : char;
      })
      .join('');
  }

  public paddedNumber(number: number): string {
    const paddedNumber = `0${number}`;

    return paddedNumber.slice(-2);
  }
}
