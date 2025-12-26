import {TestBed} from '@angular/core/testing';
import {ToastrService} from 'ngx-toastr';

import {UkAlertService} from './alert.service';

describe('UkAlertService', () => {
  let alertService: UkAlertService;
  let toastrServiceSpy: any;

  beforeEach(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'info',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UkAlertService,
        {provide: ToastrService, useValue: toastrServiceSpy},
      ],
    });

    alertService = TestBed.get(UkAlertService);
  });

  it('should create the service', () => {
    expect(alertService).toBeTruthy();
  });

  it('should has success message', () => {
    alertService.success('');
    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
  });
});
