import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface UkLoader {
  totalRequests: number;
  currentRequestIndex: number;
  percent?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UkLoaderService {
  private activeRequests = 0;

  public isLoading = new BehaviorSubject({
    totalRequests: 0,
    currentRequestIndex: 0,
    percent: 0,
  } as UkLoader);

  public showLoader(): void {
    this.activeRequests++;
    this.isLoading.next({
      totalRequests: this.activeRequests,
      currentRequestIndex: 0,
      percent: null!,
    });
  }

  public hideLoader(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);

    this.isLoading.next({
      totalRequests: this.activeRequests,
      currentRequestIndex: 0,
      percent: null!,
    });
  }
}
