import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { FeedItemModel } from '@utils/ui-kit/definitions/swagger/feed.dto';
import {
  UkLikeService,
  UkCommentService,
  UkAuthenticateService,
} from '@utils/ui-kit/services';

@Component({
  selector: 'hang-post-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangPostCardComponent {
  @Input() public post!: FeedItemModel;
  @Output() public liked = new EventEmitter<{
    postId: string;
    isLiked: boolean;
    likeCount: number;
  }>();
  @Output() public commented = new EventEmitter<{ postId: string }>();

  public newComment = '';

  private readonly likeService = inject(UkLikeService);
  private readonly commentService = inject(UkCommentService);
  private readonly auth = inject(UkAuthenticateService);

  public toggleLike(): void {
    this.likeService.toggleLike(this.post._id).subscribe(() => {
      const wasLiked = this.post.isLikedByUser;
      this.post.isLikedByUser = !wasLiked;
      this.post.likeCount = wasLiked
        ? Math.max(0, (this.post.likeCount || 0) - 1)
        : (this.post.likeCount || 0) + 1;

      this.liked.emit({
        postId: this.post._id,
        isLiked: this.post.isLikedByUser,
        likeCount: this.post.likeCount,
      });
    });
  }

  public addComment(): void {
    if (!this.newComment.trim()) return;

    this.commentService
      .addComment(this.post._id as any, { text: this.newComment.trim() })
      .subscribe((res: any) => {
        if (res?.data) {
          this.post.comments = this.post.comments || [];
          this.post.comments.unshift(res.data);
          this.newComment = '';
          this.commented.emit({ postId: this.post._id });
        }
      });
  }
}
