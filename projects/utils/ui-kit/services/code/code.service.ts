import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UkCodeService {
  public luhnChecksum(cardNumber: string): number {
    let sum = 0;
    let shouldDouble = false;

    // Loop through digits in reverse order
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10;
  }

  public generateIranianBankCardNumber(binNumber: string): string {
    if (binNumber.length !== 6) {
      throw new Error('BIN number must be 6 digits');
    }

    // Generate the first 15 digits of the card number
    let cardNumber =
      binNumber +
      new Array(9)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join('');

    // Calculate the Luhn checksum digit
    const checksum = this.luhnChecksum(`${cardNumber}0`);
    const checksumDigit = checksum === 0 ? 0 : 10 - checksum;

    // Append the checksum digit to the card number
    cardNumber += checksumDigit.toString();

    return cardNumber;
  }

  // https://github.com/majidh1/iranianNationalCode/blob/main/src/iranianNationalCodeGenerator.js
  public generateIranianNationalCode(): string {
    const list = [];
    let sum = 0;

    for (let i = 10; i > 1; i--) {
      const j = Math.floor(Math.random() * Math.floor(10));

      list.push(j);
      sum += j * i;
    }

    const s = sum % 11;

    if (s < 2) {
      list.push(s);
    } else if (s >= 2) {
      list.push(11 - s);
    }

    return list.join('');
  }
}

// usage
// let binNumber = "603799";
// let cardNumber = generateIranCardNumber(binNumber);
