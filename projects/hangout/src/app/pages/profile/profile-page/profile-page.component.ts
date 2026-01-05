import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import {UK_TYPE} from '@utils/ui-kit/definitions';

import {PROFILE_RESET_ACTIONS} from '../_store/profile.actions';
import {HangProfileInfoComponent} from './page-parts/profile-info/profile-info.component';
import {HangProfilePostsComponent} from './page-parts/profile-posts/profile-posts.component';

@Component({
  standalone: true,
  selector: 'hang-profile-page',
  imports: [
    CommonModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    HangProfileInfoComponent,
    HangProfilePostsComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePageComponent implements OnDestroy {
  private readonly store = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly UK_TYPE = UK_TYPE;

  constructor() {
    this.activatedRoute.paramMap.subscribe(() => {
      this.store.dispatch(PROFILE_RESET_ACTIONS.$RESET_PROFILE());
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(PROFILE_RESET_ACTIONS.$RESET_PROFILE());
  }
}
