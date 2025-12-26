import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UkAlertService {
  private readonly toastrService = inject(ToastrService);

  public success(title: string, message?: string): void {
    this.toastrService.success(message, title, {
      positionClass: 'toast-top-left',
      toastClass: 'ngx-toastr uk-success-toast',
      timeOut: 5000,
    });
  }

  public error(title: string, message?: string): void {
    this.toastrService.error(message, title, {
      positionClass: 'toast-top-left',
      toastClass: 'ngx-toastr uk-error-toast',
      timeOut: 5000,
    });
  }

  public info(title: string, message?: string): void {
    this.toastrService.info(message, title, {
      positionClass: 'toast-top-left',
      toastClass: 'ngx-toastr uk-info-toast',
      timeOut: 5000,
    });
  }
}
