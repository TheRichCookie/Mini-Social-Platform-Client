import {ChangeDetectionStrategy, Component} from '@angular/core';
import { UkTextComponent } from "@utils/ui-kit/components";

@Component({
  standalone: true,
  selector: 'hang-header',
  imports: [UkTextComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHeaderComponent {
  // private readonly store = inject(Store);
  // private readonly changeDetectorRef = inject(ChangeDetectorRef);
  // private readonly notificationService = inject(UkNotificationService);
  // private readonly socket = inject(UkSocketService);
  // private readonly router = inject(Router);
  // public appTabBarHeight: number = CONST_CONFIG.COMMON.APP_TAB_BAR_HEIGHT;
  // public unread = 0;
  // public slugsLowerCase: string[] = [];
  // public menus: UkMenu[] = [
  //   {
  //     name: 'Home',
  //     icon: UK_TYPE.ICON.NAME.HOME,
  //     slug: APP_ROUTES.HOME.ROOT,
  //     isActive: false,
  //   },
  //   {
  //     name: 'Search',
  //     icon: UK_TYPE.ICON.NAME.HOME,
  //     slug: '',
  //     isActive: false,
  //   },
  //   {
  //     name: 'Create',
  //     icon: UK_TYPE.ICON.NAME.HOME,
  //     slug: '',
  //     isActive: false,
  //   },
  //   {
  //     name: 'Messages',
  //     icon: UK_TYPE.ICON.NAME.HOME,
  //     slug: '',
  //     isActive: false,
  //   },
  //   {
  //     name: 'Profile',
  //     icon: UK_TYPE.ICON.NAME.HOME,
  //     slug: '',
  //     isActive: false,
  //   },
  // ];
  // constructor() {
  //   this.loadNotifications();
  //   this.socket.notification$.subscribe((n) => {
  //     if (!n) return;
  //     this.unread = this.unread + 1;
  //     this.changeDetectorRef.markForCheck();
  //   });
  //   this.store
  //     .select(SELECT_ROUTER_CURRENT_ROUTE)
  //     .pipe(takeUntilDestroyed())
  //     .subscribe((slugs: string[]) => {
  //       this.slugsLowerCase = slugs.map((slug) => slug.toLocaleLowerCase());
  //       this.menus.forEach((menu) => {
  //         const MENU_SLUG = menu.slug.split('/');
  //         menu.isActive = false;
  //         if (MENU_SLUG[1]) {
  //           if (MENU_SLUG[1] === this.slugsLowerCase[1]) {
  //             menu.isActive = true;
  //           }
  //         } else if (MENU_SLUG[0] === this.slugsLowerCase[0]) {
  //           menu.isActive = true;
  //         }
  //       });
  //       this.menus = JSON.parse(JSON.stringify(this.menus));
  //       this.changeDetectorRef.markForCheck();
  //     });
  // }
  // public loadNotifications(): void {
  //   this.notificationService.getNotifications().subscribe((res: any) => {
  //     if (res?.data) {
  //       const unread = (res.data as any[]).filter((x) => !x.isRead).length;
  //       this.unread = unread;
  //       this.changeDetectorRef.markForCheck();
  //     }
  //   });
  // }
  // public goNotifications(): void {
  //   void this.router.navigate(['/notifications']);
  // }
}
