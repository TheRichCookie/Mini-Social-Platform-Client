import {CommonModule} from '@angular/common';
import type {ElementRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import type {ControlValueAccessor, ValidationErrors} from '@angular/forms';
import {
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {UkErrorTypes} from '@utils/ui-kit/arrangements';
import {
  UkIconComponent,
  UkShapeIconComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import type {
  FileUploaderType,
  IconName,
  UkImageUpload,
} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
  UkFileUploaderStatus,
  UkFileUploaderType,
} from '@utils/ui-kit/definitions';

export const ACCEPT_IMAGE = '.jpg,.jpeg,.png,.gif';
export const ACCEPT_DOCUMENT = '.jpg,.jpeg,.png,.gif,.pdf';
export const ACCEPT_SHEET = '.xls,.xlsx,.csv';

interface UkUploaderArrayForm {
  uploader: FormArray<FormGroup<UkUploaderForm>>;
}

type UkUploaderForm = {
  [K in keyof UkImageUpload]: FormControl<UkImageUpload[K]>;
};

@Component({
  standalone: true,
  selector: 'uk-file-uploader',
  imports: [
    CommonModule,
    UkShapeIconComponent,
    UkTextComponent,
    UkIconComponent,
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkFileUploaderComponent),
      multi: true,
    },
  ],
})
export class UkFileUploaderComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('input', {static: true})
  public inputEl!: ElementRef;

  @Input()
  public multiple = false;

  @Input()
  public preview = true;

  @Input()
  public type: FileUploaderType = DEFAULT.fileUploader.type;

  public readonly UK_TYPE = UK_TYPE;
  public readonly UK_ERRORS = UkErrorTypes;
  public readonly STATUS = UkFileUploaderStatus;

  public disabled = false;

  public uploaderForm = new FormGroup<UkUploaderArrayForm>({
    uploader: new FormArray<FormGroup<UkUploaderForm>>([]),
  });

  public uploaderFormArray = {
    add: (): void => {
      this.uploaderForm.controls.uploader.push(this.uploaderFormArray.create());
    },
    create: (): FormGroup<UkUploaderForm> => {
      return new FormGroup<UkUploaderForm>({
        url: new FormControl<string | null>(
          {value: null, disabled: false},
          {
            nonNullable: true,
            validators: [],
          },
        ),
        file: new FormControl<File | null>(
          {value: null, disabled: false},
          {
            nonNullable: true,
            validators: [],
          },
        ),
        status: new FormControl<UkFileUploaderStatus>(
          {value: UkFileUploaderStatus.LOADING, disabled: true},
          {
            nonNullable: true,
            validators: [],
          },
        ),
        fromServer: new FormControl<boolean>(
          {value: false, disabled: false},
          {
            nonNullable: true,
            validators: [],
          },
        ),
      });
    },
    delete: (index: number): void => {
      this.inputEl.nativeElement.value = '';
      this.uploaderForm.controls.uploader.removeAt(index);
      this.onChange(this.uploaderForm.controls.uploader.value);
    },
    patch: (value: UkImageUpload, index: number, fromWrite = false) => {
      const FA = this.uploaderForm.controls.uploader.controls;

      this.inputEl.nativeElement.value = '';

      FA[index].patchValue({
        file: value.file,
        url: value.url,
        status: value.status,
        fromServer: value.fromServer,
      });

      if (!fromWrite) {
        this.onChange(this.uploaderForm.controls.uploader.value);
      }
    },
  };

  public onChange = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public onTouched = UIKIT_EMPTY_FUNCTION;

  public get acceptFormat(): string {
    switch (this.type as UkFileUploaderType) {
      case UK_TYPE.FILE_UPLOADER.TYPE.IMAGE:
        return ACCEPT_IMAGE;
      case UK_TYPE.FILE_UPLOADER.TYPE.DOCUMENT:
        return ACCEPT_DOCUMENT;
      case UK_TYPE.FILE_UPLOADER.TYPE.SHEET:
        return ACCEPT_SHEET;
      default:
        return ACCEPT_IMAGE;
    }
  }

  public get shapeIcon(): IconName {
    switch (this.type as UkFileUploaderType) {
      case UK_TYPE.FILE_UPLOADER.TYPE.IMAGE:
        return UK_TYPE.SHAPE_ICON.ICON_NAME.IMAGE;
      case UK_TYPE.FILE_UPLOADER.TYPE.DOCUMENT:
        return UK_TYPE.SHAPE_ICON.ICON_NAME.FILE;
      case UK_TYPE.FILE_UPLOADER.TYPE.SHEET:
        return UK_TYPE.SHAPE_ICON.ICON_NAME.FILE;
      default:
        return UK_TYPE.SHAPE_ICON.ICON_NAME.FILE;
    }
  }

  @Input()
  public set errors(errors: ValidationErrors | null) {
    const SIZE_LIMIT: boolean[] = errors?.[this.UK_ERRORS.SIZE_LIMIT] ?? [];
    const INVALID_FORMAT: boolean[] =
      errors?.[this.UK_ERRORS.INVALID_FORMAT] ?? [];

    if (INVALID_FORMAT.length) {
      INVALID_FORMAT.forEach((valid, index) => {
        if (valid !== null && !valid) {
          this.uploaderForm.controls.uploader.controls[
            index
          ].controls.status?.patchValue(this.STATUS.FAILED);
        }
      });
    }

    if (SIZE_LIMIT.length) {
      SIZE_LIMIT.forEach((reachedLimit, index) => {
        if (reachedLimit) {
          this.uploaderForm.controls.uploader.controls[
            index
          ].controls.status?.patchValue(this.STATUS.FAILED);
        }
      });
    }
  }

  public getFormatBasedOnExtension(
    name: string | undefined,
  ): UkFileUploaderType | null {
    const extension = name?.split('.').at(-1);

    if (ACCEPT_IMAGE.split(',').includes(`.${extension}`)) {
      return UkFileUploaderType.IMAGE;
    }

    if (ACCEPT_SHEET.split(',').includes(`.${extension}`)) {
      return UkFileUploaderType.SHEET;
    }

    if (ACCEPT_DOCUMENT.split(',').includes(`.${extension}`)) {
      return UkFileUploaderType.DOCUMENT;
    }

    return null;
  }

  public onInput(input: HTMLInputElement): void {
    this.onTouched();

    const files = input.files;

    if (!files) return;

    const fileLength = files.length;

    for (let i = 0; i < fileLength; i++) {
      const file = files.item(i);

      if (!file) continue;

      const READER = new FileReader();

      READER.readAsDataURL(file);

      READER.onload = (e) => {
        if (!e.target?.result) return;

        // SINGLE MODE
        if (!this.multiple) {
          this.uploaderForm.controls.uploader.clear();
          this.uploaderFormArray.add();
          this.uploaderFormArray.patch(
            {
              file,
              url: e.target.result as string,
              status: this.STATUS.DONE,
            },
            0,
          );
          this.changeDetectorRef.markForCheck();

          return;
        }

        // MULTIPLE MODE
        this.uploaderFormArray.add();
        const index = this.uploaderForm.controls.uploader.length - 1;

        this.uploaderFormArray.patch(
          {
            file,
            url: e.target.result as string,
            status: this.STATUS.DONE,
          },
          index,
        );

        this.changeDetectorRef.markForCheck();
      };

      READER.onerror = () => {};

      if (!this.multiple) {
        break;
      }
    }
  }

  public writeValue(values: UkImageUpload[]): void {
    if (this.multiple) {
      values.forEach((value, index) => {
        this.uploaderFormArray.add();
        this.uploaderFormArray.patch(value, index, true);
      });
    } else {
      if (values.length) {
        const index = 0;

        this.uploaderFormArray.add();
        this.uploaderFormArray.patch(values[index], index, true);
      }
    }
  }

  public registerOnChange(fn: (_: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
