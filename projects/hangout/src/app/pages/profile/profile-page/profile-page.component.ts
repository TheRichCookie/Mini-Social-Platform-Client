import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import { UK_TYPE } from '@utils/ui-kit/definitions';
import {
  UkProfileService,
  UkAuthenticateService,
} from '@utils/ui-kit/services';
import { HangPostCardComponent } from '../../home/_components/post-card/post-card.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'hang-profile-page',
  imports: [
    CommonModule,
    UkPagePartComponent,
    UkPageBodyComponent,
    UkPageComponent,
    HangPostCardComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePageComponent {
  public readonly UK_TYPE = UK_TYPE;

  public readonly profile = signal<any>(null);
  public readonly posts = signal<any[]>([]);
  public readonly loadingProfile = signal(true);
  public readonly loadingPosts = signal(true);
  public readonly error = signal<string | null>(null);

  private readonly profileService = inject(UkProfileService);
  private readonly authenticate = inject(UkAuthenticateService);

  constructor() {
    const token = (this.authenticate as any).token;
    if (!token) {
      this.loadingProfile.set(false);
      this.loadingPosts.set(false);
      this.error.set('Not authenticated');
      return;
    }

    try {
      const decoded: any = jwtDecode(token as string);
      const userId = decoded?.id || decoded?._id || decoded?.userId;
      if (!userId) {
        this.loadingProfile.set(false);
        this.loadingPosts.set(false);
        this.error.set('Invalid token');
        return;
      }

      this.loadingProfile.set(true);
      this.profileService.getProfile(userId).subscribe({
        next: (res: any) => {
          this.profile.set(res?.data || null);
          this.loadingProfile.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Failed to load profile');
          this.loadingProfile.set(false);
        },
      });

      this.loadingPosts.set(true);
      this.profileService.getUserProfilePosts(userId).subscribe({
        next: (res: any) => {
          this.posts.set(res?.data || []);
          this.loadingPosts.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Failed to load posts');
          this.loadingPosts.set(false);
        },
      });
    } catch (error) {
      this.error.set('Failed to decode token');
      this.loadingProfile.set(false);
      this.loadingPosts.set(false);
    }
  }

  public reload(): void {
    try {
      window.location.reload();
    } catch (e) {
      // noop
    }
  }
}
