import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'hang-search-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangSearchPageComponent {
  // public readonly ctrl = new FormControl('');
  // public readonly results = signal<any[]>([]);
  // public readonly loading = signal(false);
  // public readonly error = signal<string | null>(null);
  // private readonly userService = inject(UkUserService);
  // private readonly followService = inject(UkFollowService);
  // private readonly alert = inject(UkAlertService);
  // constructor() {
  //   this.ctrl.valueChanges
  //     .pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       filter((v) => typeof v === 'string' && v.length > 0),
  //       tap(() => {
  //         this.error.set(null);
  //         this.loading.set(true);
  //       }),
  //       switchMap((q) =>
  //         this.userService.searchUsers(q as string).pipe(
  //           catchError((err) => {
  //             const msg = err?.error?.message || 'Search failed';
  //             this.error.set(msg);
  //             try {
  //               this.alert.error('Search failed', msg);
  //             } catch (_) {}
  //             return of({data: [] });
  //           }),
  //         ),
  //       ),
  //     )
  //     .subscribe((res) => {
  //       this.results.set(res?.data || []);
  //       this.loading.set(false);
  //     });
  // }
  // public toggleFollow(userId: string) {
  //   this.followService.toggleFollow(userId).subscribe({
  //     next: () => {
  //       const list = this.results();
  //       const idx = list.findIndex((x: any) => x.id === userId);
  //       if (idx > -1) {
  //         list[idx].isFollowing = !list[idx].isFollowing;
  //         this.results.set([...list]);
  //       }
  //     },
  //     error: (err) => {
  //       const msg = err?.error?.message || 'Could not change follow status';
  //       this.error.set(msg);
  //       try {
  //         this.alert.error('Follow failed', msg);
  //       } catch (_) {}
  //     },
  //   });
  // }
}
