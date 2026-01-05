import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UkIconComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {debounceTime, distinctUntilChanged} from 'rxjs';

export interface UkSearchBarResult {
  searchValue: string | null;
  selectValue: string;
}

@Component({
  standalone: true,
  selector: 'uk-search-bar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UkIconComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkSearchBarComponent {
  @Output()
  public readonly SEARCH = new EventEmitter<string>();

  public readonly UK_TYPE = UK_TYPE;

  public searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        if (typeof value === 'string') {
          this.SEARCH.emit(value.trim());
        }
      });
  }
}
