export enum UkCustomValidationErrors {
  ARRAY_AT_LEAST_LENGTH = 'arrayAtLeastLength',
  FILE_AND_SOURCE_MISSING = 'fileAndSourceMissing',
  IRANIAN_BANK_CARD_IBAN_NUMBER = 'iranianBankCardIbanNumber',
  IRANIAN_BANK_CARD_NUMBER = 'iranianBankCardNumber',
  NATIONAL_CODE = 'nationalCode',
  EMPTY_OR_NUMBER_INVALID = 'emptyOrNumberInvalid',
  VALUE_TRUE_REQUIRED = 'valueTrueRequired',
}

export enum UkCustomNationalCodeErrors {
  NOT_EQUAL_DIGITS = 'notEqualDigits',
  NOT_VALID_CODE = 'notValidCode',
}

export enum UkCustomIranianBankCardNumberErrors {
  NOT_VALID_NUMBER = 'notValidNumber',
}
