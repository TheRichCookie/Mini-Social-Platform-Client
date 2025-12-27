/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  SELECT_PROFILE_FOLLOWERS,
  SELECT_PROFILE_FOLLOWING,
  SELECT_PROFILE_POSTS,
  SELECT_PROFILE_USER,
} from '@app/pages/profile/_store/profile.selectors';
import {Store} from '@ngrx/store';
import {UkPageBodyComponent, UkPageComponent} from '@utils/ui-kit/arrangements';
import {UkButtonComponent} from '@utils/ui-kit/components/button/button.component';
import {UkImageComponent} from '@utils/ui-kit/components/image/image.component';
import {UkListComponent} from '@utils/ui-kit/components/list/list.component';
import {UkTextComponent} from '@utils/ui-kit/components/text/text.component';
import {UkTileComponent} from '@utils/ui-kit/components/tile/tile.component';

import * as PROFILE_ACTION from '../_store/profile.actions';

@Component({
  standalone: true,
  selector: 'hang-profile',
  imports: [
    CommonModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkTileComponent,
    UkImageComponent,
    UkTextComponent,
    UkListComponent,
    UkButtonComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  public readonly user$ = this.store.select(SELECT_PROFILE_USER);
  public readonly posts$ = this.store.select(SELECT_PROFILE_POSTS);
  public readonly followers$ = this.store.select(SELECT_PROFILE_FOLLOWERS);
  public readonly following$ = this.store.select(SELECT_PROFILE_FOLLOWING);

  public ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (userId) {
      this.store.dispatch(
        PROFILE_ACTION.PROFILE_ACTIONS.$GET_PROFILE_DETAIL({userId}),
      );

      this.store.dispatch(
        PROFILE_ACTION.PROFILE_ACTIONS.$GET_PROFILE_POSTS({userId}),
      );
    }
  }

  public toggleFollow(userId?: string): void {
    if (!userId) return;

    this.store.dispatch(
      PROFILE_ACTION.PROFILE_ACTIONS.$TOGGLE_FOLLOW_PROFILE({userId}),
    );
  }
}
