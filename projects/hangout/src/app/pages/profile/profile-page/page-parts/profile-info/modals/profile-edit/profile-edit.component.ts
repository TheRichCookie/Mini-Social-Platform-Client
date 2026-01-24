import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {PROFILE_EDIT_ACTIONS} from '@app/pages/profile/_store/profile.actions';
import {Store} from '@ngrx/store';
import {
  UkButtonGroupComponent,
  UkFormBodyComponent,
  UkFormComponent,
  UkFormControllerComponent,
  UkFormPartComponent,
  UkFormRowComponent,
  UkModalFrameComponent,
} from '@utils/ui-kit/arrangements';
import {UkButtonComponent, UkTextComponent} from '@utils/ui-kit/components';
import type {UpdateProfileRequest, UserModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkInputComponent} from '@utils/ui-kit/forms';

export interface HangProfileEditForm {
  bio: FormControl<string>;
  major: FormControl<string>;
}

interface PageController {
  props: {
    response: UserModel | null;
  };
  methods: {
    update: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-profile-edit',
  imports: [
    UkModalFrameComponent,
    UkButtonGroupComponent,
    UkButtonComponent,
    CommonModule,
    UkFormControllerComponent,
    UkFormComponent,
    UkFormBodyComponent,
    UkFormPartComponent,
    UkFormRowComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UkTextComponent,
    UkInputComponent,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfileEditModalComponent implements OnInit {
  private readonly store = inject(Store);

  @Input()
  public info: {bio: string; major: string} = {bio: '', major: ''};

  @Output()
  public readonly ON_CLOSE = new EventEmitter();

  @Output()
  public readonly ON_SUBMIT = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;

  public profileEditFormSubmitted = false;
  public profileEditForm = new FormGroup<HangProfileEditForm>({
    bio: new FormControl<string>(
      {value: '', disabled: false},
      {
        nonNullable: true,
        validators: [],
      },
    ),
    major: new FormControl<string>(
      {value: '', disabled: false},
      {
        nonNullable: true,
        validators: [],
      },
    ),
  });

  public PC: PageController = {
    props: {
      response: null,
    },
    methods: {
      update: () => {
        this.profileEditFormSubmitted = true;
        if (this.profileEditForm.invalid) return;

        const REQUEST: UpdateProfileRequest =
          this.profileEditForm.getRawValue();

        this.store.dispatch(
          PROFILE_EDIT_ACTIONS.$PATCH_PROFILE_DETAIL({body: REQUEST}),
        );
      },
    },
  };

  public onClose(): void {
    this.ON_CLOSE.emit();
  }

  public onSubmit(): void {
    this.PC.methods.update();
    this.ON_SUBMIT.emit();
  }

  public ngOnInit(): void {
    this.profileEditForm.patchValue(this.info);
  }
}
