import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PROFILE_ACTIONS} from '@app/pages/profile/_store/profile.actions';
import {
  SELECT_PROFILE_DETAIL_RES,
  SELECT_PROFILE_FOLLOWERS_RES,
  SELECT_PROFILE_FOLLOWING_RES,
} from '@app/pages/profile/_store/profile.selectors';
import {Store} from '@ngrx/store';
import {UkShapeIconComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'hang-profile-details',
  imports: [CommonModule, UkShapeIconComponent],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfileDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store);
  public readonly UK_TYPE = UK_TYPE;

  public readonly user$ = this.store.select(SELECT_PROFILE_DETAIL_RES);
  public readonly followers$ = this.store.select(SELECT_PROFILE_FOLLOWERS_RES);
  public readonly following$ = this.store.select(SELECT_PROFILE_FOLLOWING_RES);

  public ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id') ?? undefined;

    const REQUEST = userId ? {userId} : {};

    this.store.dispatch(PROFILE_ACTIONS.$GET_PROFILE_DETAIL(REQUEST));
  }

  // public toggleFollow(userId?: string): void {
  //   if (!userId) return;

  //   this.store.dispatch(
  //     PROFILE_ACTION.PROFILE_ACTIONS.$TOGGLE_FOLLOW_PROFILE({userId}),
  //   );
  // }
}
