import {Injectable} from '@angular/core';
import jsQR from 'jsqr';

@Injectable({providedIn: 'root'})
export class UkQrCodeReaderService {
  public async scanQRCodeFromVideo(
    video: HTMLVideoElement,
  ): Promise<string | null> {
    if (!video || video.readyState < 2) {
      throw new Error('Video element is not ready.');
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to create 2D context for QR scan.');
    }

    return new Promise((resolve, reject) => {
      const attemptScan = (): void => {
        try {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          );
          const result = jsQR(imageData.data, canvas.width, canvas.height);

          if (result) {
            resolve(result.data);
          } else {
            requestAnimationFrame(attemptScan);
          }
        } catch (error) {
          reject(`Failed to scan QR code: ${(error as Error).message}`);
        }
      };

      attemptScan();
    });
  }
}
