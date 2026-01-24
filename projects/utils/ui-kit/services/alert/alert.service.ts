import {inject, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UkAlertService {
  private readonly toastrService = inject(ToastrService);

  public success(title: string, message?: string): void {
    this.toastrService.success(message, title, {
      toastClass: 'ngx-toastr uk-success-toast',
      extendedTimeOut: 2500,
    });
  }

  public error(title: string, message?: string): void {
    this.toastrService.error(message, title, {
      toastClass: 'ngx-toastr uk-error-toast',
      extendedTimeOut: 2500,
    });
  }

  public info(title: string, message?: string): void {
    this.toastrService.info(message, title, {
      toastClass: 'ngx-toastr uk-info-toast',
      extendedTimeOut: 2500,
    });
  }
}
