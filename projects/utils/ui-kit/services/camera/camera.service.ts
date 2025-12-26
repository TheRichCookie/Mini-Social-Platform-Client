import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type CameraPermissionState = 'denied' | 'granted' | 'prompt';

@Injectable({providedIn: 'root'})
export class UkCameraService {
  private currentStream: MediaStream | null = null;

  // 🔁 More expressive permission state observable
  public readonly cameraPermission$ =
    new BehaviorSubject<CameraPermissionState>('prompt');

  public async startCamera(
    constraints?: MediaStreamConstraints,
    facing?: 'environment' | 'user',
  ): Promise<MediaStream> {
    if (!navigator.mediaDevices?.getUserMedia) {
      this.cameraPermission$.next('denied');
      throw new Error('Camera API not supported in this browser.');
    }

    constraints ??= this.getScreenBasedConstraints(facing);

    if (facing) {
      constraints.video = {
        ...(typeof constraints.video === 'object' ? constraints.video : {}),
        facingMode: {ideal: facing},
      };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      this.currentStream = stream;
      this.cameraPermission$.next('granted'); // ✅ Now emits 'granted'

      return stream;
    } catch (err) {
      this.cameraPermission$.next('denied'); // ❌ Failed or blocked

      if (err instanceof DOMException) {
        switch (err.name) {
          case 'NotAllowedError':
            throw new Error('دسترسی به دوربین توسط کاربر رد شد.');
          case 'NotFoundError':
            throw new Error('دستگاه دوربین پیدا نشد.');
          case 'NotReadableError':
            throw new Error(
              'دوربین در حال حاضر توسط برنامه دیگری در حال استفاده است.',
            );
          case 'OverconstrainedError':
            throw new Error('هیچ دوربینی با تنظیمات درخواستی موجود نیست.');
          case 'AbortError':
            throw new Error('راه‌اندازی دوربین با خطا متوقف شد.');
          case 'SecurityError':
            throw new Error(
              'دسترسی به دوربین به دلیل تنظیمات امنیتی مسدود شده است.',
            );
          case 'TypeError':
            throw new Error('تنظیمات دوربین نادرست هستند.');
          default:
            throw new Error(`خطای ناشناخته دوربین: ${err.message}`);
        }
      }

      throw err;
    }
  }

  public stopCamera(stream?: MediaStream): void {
    const targetStream = stream ?? this.currentStream;

    targetStream?.getTracks().forEach((track) => track.stop());
    this.currentStream = null;
    this.cameraPermission$.next('prompt'); // 🔄 Assume permission status unknown again
  }

  public async restartCamera(
    constraints?: MediaStreamConstraints,
    facing?: 'environment' | 'user',
  ): Promise<MediaStream> {
    this.stopCamera();

    return this.startCamera(constraints, facing);
  }

  public getScreenBasedConstraints(
    _facing: 'environment' | 'user' = 'environment',
  ): MediaStreamConstraints {
    const isPortrait = window.innerHeight > window.innerWidth;
    const width = isPortrait ? window.innerWidth : window.innerHeight;
    const height = isPortrait ? window.innerHeight : window.innerWidth;

    return {
      video: {
        width: {ideal: width},
        height: {ideal: height},
        // facingMode: { ideal: facing },
      },
      audio: false,
    };
  }

  public getCurrentStream(): MediaStream | null {
    return this.currentStream;
  }

  public async requestCameraAccess(): Promise<boolean> {
    try {
      const result = await navigator.permissions?.query({
        name: 'camera' as PermissionName,
      });

      if (result?.state === 'granted') {
        this.cameraPermission$.next('granted');

        return true;
      }

      if (result?.state === 'denied') {
        this.cameraPermission$.next('denied');
        console.warn(
          'Camera access has been denied. Please enable it in your browser settings.',
        );

        return false;
      }

      this.cameraPermission$.next('prompt'); // Set before trying
      await this.startCamera(); // May prompt the user

      return true;
    } catch (err) {
      this.cameraPermission$.next('denied');
      console.error('Camera access failed:', err);

      return false;
    }
  }
}

// USAGE:
// // Uses default screen size + environment-facing
// const stream = await cameraService.startCamera();
// // with custom facing mode and auto-sized constraints:
// const stream = await cameraService.startCamera(
//     cameraService.getScreenBasedConstraints('user')
// );
// // restart:
// await cameraService.restartCamera(cameraService.getScreenBasedConstraints('environment'));

// USAGE:
// this.cameraService.cameraPermission$.subscribe(permission => {
//   if (permission === 'granted') {
//     // ✅ Show camera UI
//   } else if (permission === 'denied') {
//     // 🚫 Show "camera blocked" or warning
//   } else {
//     // 🤔 Show "please allow camera access" prompt or instruction
//   }
// });
