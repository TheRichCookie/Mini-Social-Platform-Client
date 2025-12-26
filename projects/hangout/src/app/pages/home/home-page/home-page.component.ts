import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import { UK_TYPE } from '@utils/ui-kit/definitions';
import {
  UkFeedService,
  UkSocketService,
  UkCommentService,
} from '@utils/ui-kit/services';
import { HangPostCardComponent } from '../_components/post-card/post-card.component';
import type { FeedItemModel } from '@utils/ui-kit/definitions/swagger/feed.dto';

@Component({
  selector: 'hang-home-page',
  imports: [
    CommonModule,
    FormsModule,
    UkPagePartComponent,
    UkPageBodyComponent,
    UkPageComponent,
    HangPostCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHomePageComponent {
  public readonly UK_TYPE = UK_TYPE;

  private readonly feedService = inject(UkFeedService);
  private readonly socketService = inject(UkSocketService);
  private readonly commentService = inject(UkCommentService);

  public posts = signal<FeedItemModel[]>([]);

  constructor() {
    this.loadFeed();

    this.socketService.notification$.subscribe((payload) => {
      if (!payload?.postId) return;

      const postId = String(payload.postId);
      const current = this.posts();
      const idx = current.findIndex((p) => p._id === postId);

      if (idx === -1) return;

      const copy = [...current];

      if (payload.type === 'like') {
        const post = { ...copy[idx] };
        post.likeCount = (post.likeCount || 0) + 1;
        post.isLikedByUser = post.isLikedByUser || false;
        copy[idx] = post;
        this.posts.set(copy);
      }

      if (payload.type === 'comment') {
        this.commentService
          .getPostComments(postId as any)
          .subscribe((res: any) => {
            const post = { ...copy[idx] };
            post.comments = res?.data || post.comments || [];
            copy[idx] = post;
            this.posts.set(copy);
          });
      }
    });
  }

  private loadFeed(): void {
    this.feedService.getFeed(1, 50).subscribe((res: any) => {
      if (res?.data) this.posts.set(res.data as FeedItemModel[]);
    });
  }

  public onLiked(e: {
    postId: string;
    isLiked: boolean;
    likeCount: number;
  }): void {
    const current = [...this.posts()];
    const idx = current.findIndex((p) => p._id === e.postId);
    if (idx === -1) return;
    const post = { ...current[idx] };
    post.isLikedByUser = e.isLiked;
    post.likeCount = e.likeCount;
    current[idx] = post;
    this.posts.set(current);
  }

  public onCommented(_e: { postId: string }): void {
    // comment was already pushed by child component; nothing further needed
  }
}
