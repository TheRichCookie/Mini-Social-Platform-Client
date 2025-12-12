import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import {Router} from '@angular/router';
import type {UkMenu} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';

import {UkSideMenuComponent} from './side-menu/side-menu.component';

@Component({
  standalone: true,
  selector: 'uk-side-menus',
  imports: [CommonModule, UkSideMenuComponent],
  templateUrl: './side-menus.component.html',
  styleUrl: './side-menus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkSideMenusComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  @Input()
  public menus: UkMenu[] = [];

  @Input()
  public slugs: string[] = [];

  public readonly UK_TYPE = UK_TYPE;

  public ngOnInit(): void {
    this.sidebarDecision(this.menus, this.slugs);
  }

  public sidebarDecision(menus: UkMenu[], slugs: string[]): void {
    menus.forEach((menu) => {
      const MENU_SLUGS = (menu.slug || '').split('/');
      const MENU_SLUGS_LOWER = MENU_SLUGS.map((u) => u.toLocaleLowerCase());

      if (slugs[0] === MENU_SLUGS_LOWER[1]) {
        menu.isActive = true;
      }

      this.changeDetectorRef.markForCheck();
    });
  }

  public toggle(_menu: UkMenu): void {
    if (_menu.slug !== '#') {
      void this.router.navigate([_menu.slug]);
    }

    this.menus.forEach((menu) => {
      menu.isActive = false;
      _menu.isActive = true;
    });
    // this.menus = JSON.parse(JSON.stringify(this.menus));
    this.changeDetectorRef.markForCheck();
  }
}
