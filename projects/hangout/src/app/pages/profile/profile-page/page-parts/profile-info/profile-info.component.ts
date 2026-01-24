import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {HangLogoutModalComponent} from '@app/pages/auth/_modals/logout-modal/logout-modal.component';
import {PROFILE_DETAIL_ACTIONS} from '@app/pages/profile/_store/profile.actions';
import {
  SELECT_PROFILE_DETAIL_RES,
  SELECT_PROFILE_FOLLOWERS_RES,
  SELECT_PROFILE_FOLLOWING_RES,
  SELECT_PROFILE_PATCH_RES,
  SELECT_PROFILE_TOGGLE_FOLLOW_RECEIVED_TIME,
} from '@app/pages/profile/_store/profile.selectors';
import {Store} from '@ngrx/store';
import {UkButtonGroupComponent} from '@utils/ui-kit/arrangements';
import {
  UkButtonComponent,
  UkIconComponent,
  UkShapeIconComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import type {UserProfileData} from '@utils/ui-kit/definitions';
import {CONST_CONFIG, UK_TYPE} from '@utils/ui-kit/definitions';
import {UkAlertService, UkOverlayService} from '@utils/ui-kit/services';
import {take} from 'rxjs';

import {HangFollowersModalComponent} from './modals/followers/followers-modal.component';
import {HangFollowingModalComponent} from './modals/following/following-modal.component';
import {HangProfileEditModalComponent} from './modals/profile-edit/profile-edit.component';

interface PageController {
  props: {
    user: UserProfileData | null;
    request: {
      userId: string;
    };
  };
  methods: {
    get: () => void;
    toggleFollow: () => void;
    openFollowersModal: () => void;
    openFollowingModal: () => void;
    openProfileEditModal: () => void;
    openLogoutModal: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-profile-info',
  imports: [
    CommonModule,
    UkShapeIconComponent,
    UkButtonComponent,
    UkTextComponent,
    UkButtonGroupComponent,
    UkIconComponent,
  ],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UkOverlayService],
})
export class HangProfileInfoComponent {
  private readonly overlayService = inject(UkOverlayService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly alertService = inject(UkAlertService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);

  public readonly UK_TYPE = UK_TYPE;

  public readonly user$ = this.store.select(SELECT_PROFILE_DETAIL_RES);
  public readonly profileEdit$ = this.store.select(SELECT_PROFILE_PATCH_RES);
  public readonly followers$ = this.store.select(SELECT_PROFILE_FOLLOWERS_RES);
  public readonly following$ = this.store.select(SELECT_PROFILE_FOLLOWING_RES);
  public readonly follow$ = this.store.select(
    SELECT_PROFILE_TOGGLE_FOLLOW_RECEIVED_TIME,
  );

  public PC: PageController = {
    props: {
      user: null,
      request: {
        userId: '',
      },
    },
    methods: {
      get: () => {
        const REQUEST: {
          userId: string;
        } = JSON.parse(
          JSON.stringify(
            this.PC.props.request.userId
              ? {userId: this.PC.props.request.userId}
              : {},
          ),
        );

        this.store.dispatch(
          PROFILE_DETAIL_ACTIONS.$GET_PROFILE_DETAIL(REQUEST),
        );
      },
      toggleFollow: () => {
        const REQUEST: {
          userId: string;
        } = JSON.parse(JSON.stringify(this.PC.props.request));

        this.store.dispatch(
          PROFILE_DETAIL_ACTIONS.$POST_PROFILE_TOGGLE_FOLLOW(REQUEST),
        );
      },
      openProfileEditModal: () => {
        const INPUTS = new Map<string, unknown>([
          [
            'info',
            {
              bio: this.PC.props.user?.user?.bio,
              major: this.PC.props.user?.user?.major,
            },
          ],
        ]);
        const OVERLAY = this.overlayService.open(
          HangProfileEditModalComponent,
          {
            hasBackdrop: true,
            positionInfo: 'CENTER_BOTTOM',
            inputs: INPUTS,
            width: CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH,
          },
        );

        OVERLAY.overlayRef
          .backdropClick()
          .pipe(take(1))
          .subscribe(() => {
            OVERLAY.overlayRef.dispose();
          });

        OVERLAY.componentRef.instance.ON_CLOSE.pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(() => {
          OVERLAY.overlayRef.dispose();
        });

        OVERLAY.componentRef.instance.ON_SUBMIT.pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(() => {
          OVERLAY.overlayRef.dispose();
        });
      },
      openFollowersModal: () => {
        const INPUTS = new Map<string, unknown>([
          ['userId', this.PC.props.user?.user?._id],
        ]);
        const OVERLAY = this.overlayService.open(HangFollowersModalComponent, {
          hasBackdrop: true,
          positionInfo: 'CENTER_BOTTOM',
          inputs: INPUTS,
          width: CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH,
        });

        OVERLAY.overlayRef
          .backdropClick()
          .pipe(take(1))
          .subscribe(() => {
            OVERLAY.overlayRef.dispose();
          });

        OVERLAY.componentRef.instance.ON_CLOSE.pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(() => {
          OVERLAY.overlayRef.dispose();
        });
      },
      openFollowingModal: () => {
        const INPUTS = new Map<string, unknown>([
          ['userId', this.PC.props.user?.user?._id],
        ]);
        const OVERLAY = this.overlayService.open(HangFollowingModalComponent, {
          hasBackdrop: true,
          positionInfo: 'CENTER_BOTTOM',
          inputs: INPUTS,
          width: CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH,
        });

        OVERLAY.overlayRef
          .backdropClick()
          .pipe(take(1))
          .subscribe(() => {
            OVERLAY.overlayRef.dispose();
          });

        OVERLAY.componentRef.instance.ON_CLOSE.pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(() => {
          OVERLAY.overlayRef.dispose();
        });
      },
      openLogoutModal: () => {
        const OVERLAY = this.overlayService.open(HangLogoutModalComponent, {
          hasBackdrop: true,
          positionInfo: 'CENTER_BOTTOM',
          width: CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH,
        });

        OVERLAY.overlayRef
          .backdropClick()
          .pipe(take(1))
          .subscribe(() => {
            OVERLAY.overlayRef.dispose();
          });

        OVERLAY.componentRef.instance.ON_CLOSE.pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(() => {
          OVERLAY.overlayRef.dispose();
        });

        OVERLAY.componentRef.instance.ON_LOGOUT.pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(() => {
          OVERLAY.overlayRef.dispose();
        });
      },
    },
  };

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user.user?._id) {
        this.PC.props.user = user;
      }
    });
    this.follow$.pipe(takeUntilDestroyed()).subscribe((receivedTime) => {
      if (receivedTime) {
        this.alertService.success('عملیات با موفقیت انجام شد');
        this.PC.methods.get();
      }
    });
    this.profileEdit$.pipe(takeUntilDestroyed()).subscribe((newUser) => {
      if (newUser._id) {
        this.alertService.success('اطلاعات با موفقیت ویرایش شد');
        this.PC.methods.get();
      }
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      this.PC.props.request.userId = params.get('id') ?? '';

      this.PC.methods.get();
    });
  }
}
