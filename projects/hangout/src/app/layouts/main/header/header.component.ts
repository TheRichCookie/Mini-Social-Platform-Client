import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {APP_ROUTES} from '@app/app.routes';
import {SELECT_ROUTER_CURRENT_ROUTE} from '@app/shared/store/router/router.selector';
import {Store} from '@ngrx/store';
import type {UkMenu} from '@utils/ui-kit/definitions';
import {CONST_CONFIG, UK_TYPE} from '@utils/ui-kit/definitions';
import { UkTextComponent, UkImageComponent } from "@utils/ui-kit/components";

@Component({
  standalone: true,
  selector: 'hang-header',
  imports: [UkTextComponent, UkImageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHeaderComponent {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public appTabBarHeight: number = CONST_CONFIG.COMMON.APP_TAB_BAR_HEIGHT;

  public slugsLowerCase: string[] = [];

  public menus: UkMenu[] = [
    {
      name: 'Home',
      icon: UK_TYPE.ICON.NAME.HOME,
      slug: APP_ROUTES.HOME.ROOT,
      isActive: false,
    },
    {
      name: 'Search',
      icon: UK_TYPE.ICON.NAME.HOME,
      slug: '',
      isActive: false,
    },
    {
      name: 'Create',
      icon: UK_TYPE.ICON.NAME.HOME,
      slug: '',
      isActive: false,
    },
    {
      name: 'Messages',
      icon: UK_TYPE.ICON.NAME.HOME,
      slug: '',
      isActive: false,
    },
    {
      name: 'Profile',
      icon: UK_TYPE.ICON.NAME.HOME,
      slug: '',
      isActive: false,
    },
  ];

  constructor() {
    this.store
      .select(SELECT_ROUTER_CURRENT_ROUTE)
      .pipe(takeUntilDestroyed())
      .subscribe((slugs: string[]) => {
        this.slugsLowerCase = slugs.map((slug) => slug.toLocaleLowerCase());

        this.menus.forEach((menu) => {
          const MENU_SLUG = menu.slug.split('/');

          menu.isActive = false;

          if (MENU_SLUG[1]) {
            if (MENU_SLUG[1] === this.slugsLowerCase[1]) {
              menu.isActive = true;
            }
          } else if (MENU_SLUG[0] === this.slugsLowerCase[0]) {
            menu.isActive = true;
          }
        });
        this.menus = JSON.parse(JSON.stringify(this.menus));
        this.changeDetectorRef.markForCheck();
      });
  }
}
