import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';

import type {Cursor, UkBreadCrumb} from '../../definitions';
import {DEFAULT, UK_TYPE} from '../../definitions';
import {UkIconComponent} from '../icon/icon.component';
import {UkTextComponent} from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-breadcrumb',
  imports: [CommonModule, RouterModule, UkIconComponent, UkTextComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkBreadcrumbComponent {
  @Input()
  public breadcrumbItems: UkBreadCrumb[] = null!;

  @Input()
  public cursor: Cursor = DEFAULT.breadcrumb.cursor;

  public readonly UK_TYPE = UK_TYPE;

  public trackByFn(index: number, item: UkBreadCrumb): string {
    return item.link ?? index;
  }
}
