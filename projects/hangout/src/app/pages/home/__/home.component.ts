import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';

import type {FeedPostModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import * as FEED_ACTION from '../_store/feed.actions';

@Component({
  standalone: true,
  selector: 'hang-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHomeComponent implements OnInit {
  private readonly store = inject(Store);

  // public readonly posts$ = this.store.select(SELECT_FEED_POSTS);

  public trackByPost(
    _: number,
    p: FeedPostModel | undefined,
  ): string | undefined {
    return p?._id;
  }

  public ngOnInit(): void {
    this.store.dispatch(FEED_ACTION.FEED_ACTIONS.$GET_FEED_POST());
  }

  public toggleLike(postId?: string): void {
    if (!postId) return;

    this.store.dispatch(
      FEED_ACTION.FEED_ACTIONS.$TOGGLE_LIKE_POST({postId: postId}),
    );
  }
}
