/* eslint-disable sort-imports */
import {VERSION as cdkVersion} from '@angular/cdk';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {isPlatformBrowser} from '@angular/common';
import {
  DestroyRef,
  inject,
  Injectable,
  PLATFORM_ID,
  VERSION as angularVersion,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {VERSION as materialVersion} from '@angular/material/core';
import {CONST_CONFIG} from '@utils/ui-kit/definitions';
import type {Observable} from 'rxjs';
import {BehaviorSubject, debounceTime, fromEvent, Subject} from 'rxjs';

export interface UkAppInfo {
  isDeviceHandset: boolean;
  isDeviceTablet: boolean;
  isDeviceWeb: boolean;
  isDevicePortrait: boolean;
  isDeviceLandscape: boolean;
  windowWidth: number;
  windowHeight: number;
  currentMaxMobileWidth: number;
  currentMaxDesktopWidth: number;
}

@Injectable({
  providedIn: 'root',
})
export class UkAppInfoService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);

  private readonly windowCheckInterval = 100;
  private readonly onChangeSubject$ = new Subject<UkAppInfo>();
  private readonly debugModeSubject$ = new BehaviorSubject<boolean>(false);

  private readonly definedMaxMobileWidth = CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH;
  private readonly definedMaxDesktopWidth =
    CONST_CONFIG.COMMON.MAX_DESKTOP_WIDTH;

  private isDeviceCustomBreakPoint = false;
  private readonly customBreakPoints = ['(max-width: 500px)'];

  private readonly appInfo: UkAppInfo = {
    isDeviceHandset: false,
    isDeviceTablet: false,
    isDeviceWeb: false,
    isDevicePortrait: false,
    isDeviceLandscape: false,
    windowWidth: this.isBrowser ? window.innerWidth : 0,
    windowHeight: this.isBrowser ? window.innerHeight : 0,
    currentMaxMobileWidth: CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH,
    currentMaxDesktopWidth: CONST_CONFIG.COMMON.MAX_DESKTOP_WIDTH,
  };

  public readonly onAppInfoChange$: Observable<UkAppInfo> =
    this.onChangeSubject$.asObservable();

  public readonly debugMode$ = this.debugModeSubject$.asObservable();

  public readonly materialVersion = materialVersion;
  public readonly cdkVersion = cdkVersion;
  public readonly angularVersion = angularVersion;

  constructor() {
    this.onChangeSubject$.next(this.appInfo);
  }

  public get isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 960px)');
  }

  public get isCustomBreakPoint(): boolean {
    return this.isDeviceCustomBreakPoint;
  }

  public get customBreakPointValue(): string[] {
    return this.customBreakPoints;
  }

  public debugMode(status: boolean): void {
    this.debugModeSubject$.next(status);
  }

  public init(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.appInfo.isDeviceHandset = res.matches;
        this.onChangeSubject$.next(this.appInfo);
      });

    this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.appInfo.isDeviceTablet = res.matches;
        this.onChangeSubject$.next(this.appInfo);
      });

    this.breakpointObserver
      .observe([Breakpoints.Web])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.appInfo.isDeviceWeb = res.matches;
        this.onChangeSubject$.next(this.appInfo);
      });

    this.breakpointObserver
      .observe(['(orientation: portrait)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.appInfo.isDevicePortrait = res.matches;
        this.onChangeSubject$.next(this.appInfo);
      });

    this.breakpointObserver
      .observe(['(orientation: landscape)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.appInfo.isDeviceLandscape = res.matches;
        this.onChangeSubject$.next(this.appInfo);
      });

    this.breakpointObserver
      .observe(this.customBreakPoints)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.isDeviceCustomBreakPoint = res.matches;
      });

    if (this.isBrowser) {
      fromEvent<UIEvent>(window, 'resize')
        .pipe(debounceTime(this.windowCheckInterval))
        .subscribe((event) => {
          const target = event.currentTarget as Window;

          this.appInfo.windowWidth = target.outerWidth;
          this.appInfo.windowHeight = target.outerHeight;
          this.appInfo.currentMaxMobileWidth = Math.min(
            target.outerWidth,
            this.definedMaxMobileWidth,
          );
          this.appInfo.currentMaxDesktopWidth = Math.min(
            target.outerWidth,
            this.definedMaxDesktopWidth,
          );
          this.onChangeSubject$.next(this.appInfo);
        });
    }
  }
}
