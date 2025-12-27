import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import type {FeedPostModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import {Store} from '@ngrx/store';
import {UkPageBodyComponent, UkPageComponent} from '@utils/ui-kit/arrangements';
import {UkButtonComponent} from '@utils/ui-kit/components/button/button.component';
import {UkImageComponent} from '@utils/ui-kit/components/image/image.component';
import {UkListComponent} from '@utils/ui-kit/components/list/list.component';
import {UkTextComponent} from '@utils/ui-kit/components/text/text.component';
import {UkTileComponent} from '@utils/ui-kit/components/tile/tile.component';

import * as FEED_ACTION from '../_store/feed.actions';
import {SELECT_FEED_POSTS} from '../_store/feed.selectors';

@Component({
  standalone: true,
  selector: 'hang-home',
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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHomeComponent implements OnInit {
  private readonly store = inject(Store);

  public readonly posts$ = this.store.select(SELECT_FEED_POSTS);

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
