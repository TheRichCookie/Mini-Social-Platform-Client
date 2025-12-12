import {TestBed} from '@angular/core/testing';
import {JalaliDateCalculatorService, JalaliDateValidatorService} from 'ngx-persian';

import {UkNumberService} from '../number/number.service';
import {UkStringService} from '../string/string.service';
import {UkDate, UkDateService} from './date.service';

describe('UkDateService', () => {
    let service: UkDateService;
    let jalaliDateCalculatorService: jasmine.SpyObj<JalaliDateCalculatorService>;
    let jalaliDateValidatorService: jasmine.SpyObj<JalaliDateValidatorService>;
    let numberService: jasmine.SpyObj<UkNumberService>;
    // let stringService: jasmine.SpyObj<UkStringService>;

    beforeEach(() => {
        const jalaliCalculatorSpy = jasmine.createSpyObj('JalaliDateCalculatorService', [
            'convertToGeorgian',
            'convertToJalali',
        ]);
        const jalaliValidatorSpy = jasmine.createSpyObj('JalaliDateValidatorService', [
            'isJYearLeap',
            'isValidJDate',
        ]);
        const numberServiceSpy = jasmine.createSpyObj('UkNumberService', [
            'paddedNumber',
        ]);
        const stringServiceSpy = jasmine.createSpyObj('UkStringService', ['isString']);

        TestBed.configureTestingModule({
            providers: [
                UkDateService,
                {provide: JalaliDateCalculatorService, useValue: jalaliCalculatorSpy},
                {provide: JalaliDateValidatorService, useValue: jalaliValidatorSpy},
                {provide: UkNumberService, useValue: numberServiceSpy},
                {provide: UkStringService, useValue: stringServiceSpy},
            ],
        });

        service = TestBed.inject(UkDateService);
        jalaliDateCalculatorService = TestBed.inject(
            JalaliDateCalculatorService,
        ) as jasmine.SpyObj<JalaliDateCalculatorService>;
        jalaliDateValidatorService = TestBed.inject(
            JalaliDateValidatorService,
        ) as jasmine.SpyObj<JalaliDateValidatorService>;
        numberService = TestBed.inject(
            UkNumberService,
        ) as jasmine.SpyObj<UkNumberService>;
        // stringService = TestBed.inject(
        //     UkStringService,
        // ) as jasmine.SpyObj<UkStringService>;
    });

    it('should convert Jalali date to Georgian date', () => {
        const jYear = 1400; // Jalali year
        const jMonth = 1; // Jalali month (zero-based)
        const jDay = 1; // Jalali day
        const georgianDate = new Date(2021, 2, 21); // expected Georgian date

        jalaliDateCalculatorService.convertToGeorgian.and.returnValue(georgianDate);

        const result = service.uKDJalaliToGeorgian(jYear, jMonth, jDay);

        expect(result).toEqual(georgianDate);
        expect(jalaliDateCalculatorService.convertToGeorgian).toHaveBeenCalledWith(
            jYear,
            jMonth,
            jDay,
        );
    });

    it('should convert Georgian date to Jalali date', () => {
        const gDate = new Date(2021, 2, 21); // Georgian date
        const jalaliDateMock: UkDate = {year: 1400, month: 1, day: 1}; // expected Jalali date

        jalaliDateCalculatorService.convertToJalali.and.returnValue(jalaliDateMock);

        const result = service.gregorianToUKDJalali(gDate);

        expect(result).toEqual(jalaliDateMock);
        expect(jalaliDateCalculatorService.convertToJalali).toHaveBeenCalledWith(gDate);
    });

    it('should determine if a Jalali year is a leap year', () => {
        jalaliDateValidatorService.isJYearLeap.and.returnValue(true);
        const result = service.isJYearLeap(1400);

        expect(result).toBeTrue();
        expect(jalaliDateValidatorService.isJYearLeap).toHaveBeenCalledWith(1400);
    });

    it('should validate a Jalali date correctly', () => {
        jalaliDateValidatorService.isValidJDate.and.returnValue(true);
        const result = service.isValidJDate(1400, 1, 1);

        expect(result).toBeTrue();
        expect(jalaliDateValidatorService.isValidJDate).toHaveBeenCalledWith(1400, 1, 1);
    });

    it('should convert epoch to Jalali date', () => {
        const epoch = 1616320320000; // some epoch time
        const gDate = new Date(epoch);
        const jalaliDateMock: UkDate = {year: 1400, month: 1, day: 1}; // expected Jalali date

        jalaliDateCalculatorService.convertToJalali.and.returnValue(jalaliDateMock);

        const result = service.epochToUKDJalali(epoch);

        expect(result).toEqual(jalaliDateMock);
        expect(jalaliDateCalculatorService.convertToJalali).toHaveBeenCalledWith(gDate);
    });

    it('should convert Jalali date to string', () => {
        const jYear = 1400;
        const jMonth = 1; // zero-based
        const jDay = 1;
        const expectedString = '1400/01/01';

        numberService.paddedNumber.and.callFake((n: number) =>
            String(n).padStart(2, '0'),
        );

        const result = service.uKDJalaliToString(jYear, jMonth, jDay);

        expect(result).toEqual(expectedString);
        expect(numberService.paddedNumber).toHaveBeenCalledTimes(2); // should be called for month and day
    });

    it('should get the current Jalali date', () => {
        // const today = new Date();

        jalaliDateCalculatorService.convertToJalali.and.returnValue({
            year: 1400,
            month: 1,
            day: 5,
        }); // mock today

        const result = service.getCurrentUKDJalali();

        expect(result).toEqual({year: 1400, month: 1, day: 5});
    });
});
