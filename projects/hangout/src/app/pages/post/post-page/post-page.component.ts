import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {
  UkFormBodyComponent,
  UkFormComponent,
  UkFormControllerComponent,
  UkFormPartComponent,
  UkFormRowComponent,
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import {UkButtonComponent, UkTextComponent} from '@utils/ui-kit/components';
import {type CreatePostRequest, UK_TYPE} from '@utils/ui-kit/definitions';
import {UkTextAreaComponent} from '@utils/ui-kit/forms';
import {UkAlertService} from '@utils/ui-kit/services';

import {POST_ACTIONS, POST_RESET_ACTIONS} from '../_store/post.actions';
import {SELECT_ADD_POST_RES} from '../_store/post.selectors';

export interface HangPostForm {
  content: FormControl<string>;
}

interface PageController {
  actions: {
    addPost: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-post-page',
  imports: [
    CommonModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    FormsModule,
    ReactiveFormsModule,
    UkFormComponent,
    UkFormBodyComponent,
    UkFormPartComponent,
    UkFormRowComponent,
    UkFormControllerComponent,
    UkTextComponent,
    UkTextAreaComponent,
    UkButtonComponent,
  ],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangPostPageComponent implements OnDestroy {
  private readonly store = inject(Store);
  private readonly alertService = inject(UkAlertService);

  private readonly addPost$ = this.store.select(SELECT_ADD_POST_RES);

  public readonly UK_TYPE = UK_TYPE;

  public postFormSubmitted = false;
  public postForm = new FormGroup<HangPostForm>({
    content: new FormControl<string>(
      {value: '', disabled: false},
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),
  });

  public PC: PageController = {
    actions: {
      addPost: () => {
        this.postFormSubmitted = true;
        if (this.postForm.invalid) return;

        const REQUEST: CreatePostRequest = this.postForm.getRawValue();

        this.store.dispatch(POST_ACTIONS.$ADD_POST({body: REQUEST}));
      },
    },
  };

  constructor() {
    this.addPost$.pipe(takeUntilDestroyed()).subscribe((res) => {
      if (res._id) {
        this.alertService.success('پست ایجاد شد');
      }
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(POST_RESET_ACTIONS.$RESET_POST());
  }
}
