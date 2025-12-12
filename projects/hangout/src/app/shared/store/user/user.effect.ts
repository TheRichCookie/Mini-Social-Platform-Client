import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions} from '@ngrx/effects';

@Injectable({providedIn: 'root'})
export class HangUserEffects {
  private readonly actions = inject(Actions);
  private readonly router = inject(Router);
}
