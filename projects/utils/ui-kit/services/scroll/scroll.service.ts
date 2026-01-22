import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UkScrollService {
  private readonly checkOverFlowSubject$ = new Subject<void>();
  public readonly checkOverFlow$ = this.checkOverFlowSubject$.asObservable();

  public checkOverFlow(): void {
    setTimeout(() => {
      this.checkOverFlowSubject$.next();
    });
  }
}
