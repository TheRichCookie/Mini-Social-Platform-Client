import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { UkLoggerPart, UkLoggerService } from '../../services';

export interface UkLocation {
  latitude: number;
  longitude: number;
}

export enum UkDirectionApi {
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
  OPEN_STREET = 'OPEN_STREET',
}

@Injectable({
  providedIn: 'root',
})
export class UkLocationService {
  private readonly loggerService = inject(UkLoggerService);

  public getCurrentLocation(): Observable<GeolocationPosition | null> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              observer.next(position);
              observer.complete();
            },
            (error) => {
              this.loggerService.error(
                UkLoggerPart.LOCATION_SERVICE,
                'navigator.geolocation',
                [error],
              );
              observer.next(null);
              observer.complete();
            },
          );
        } catch (error) {
          this.loggerService.error(
            UkLoggerPart.LOCATION_SERVICE,
            'navigator.geolocation catch error',
            [error],
          );
          observer.next(null);
          observer.complete();
        }
      } else {
        this.loggerService.error(
          UkLoggerPart.LOCATION_SERVICE,
          'Geolocation is not supported by this browser.',
        );
        observer.next(null);
        observer.complete();
      }
    });
  }

  public async getDirection(
    destination: UkLocation,
    type: UkDirectionApi,
  ): Promise<string> {
    const LOCATION = await lastValueFrom(this.getCurrentLocation());

    if (LOCATION) {
      const ORIGIN: UkLocation = {
        latitude: LOCATION.coords.latitude,
        longitude: LOCATION.coords.longitude,
      };

      switch (type) {
        case UkDirectionApi.GOOGLE:
          return this.formToGoogle(ORIGIN, destination);
        case UkDirectionApi.APPLE:
          return this.formToApple(ORIGIN, destination);
        case UkDirectionApi.OPEN_STREET:
          return this.formToOpenStreet(ORIGIN, destination);
      }
    } else {
      switch (type) {
        case UkDirectionApi.GOOGLE:
          return this.toGoogle(destination);
        case UkDirectionApi.APPLE:
          return this.toApple(destination);
        case UkDirectionApi.OPEN_STREET:
          return this.toOpenStreet(destination);
      }
    }

    throw new Error('Invalid direction type');
  }

  public formToGoogle(origin: UkLocation, destination: UkLocation): string {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;
  }

  public toGoogle(destination: UkLocation): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
  }

  public formToApple(origin: UkLocation, destination: UkLocation): string {
    return `https://maps.apple.com/?saddr=${origin.latitude},${origin.longitude}&daddr=${destination.latitude},${destination.longitude}`;
  }

  public toApple(destination: UkLocation): string {
    return `https://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}`;
  }

  public formToOpenStreet(origin: UkLocation, destination: UkLocation): string {
    return `https://www.openstreetmap.org/directions?from=${origin.latitude},${origin.longitude}&to=${destination.latitude},${destination.longitude}`;
  }

  public toOpenStreet(destination: UkLocation): string {
    return `https://www.openstreetmap.org/directions?to=${destination.latitude},${destination.longitude}`;
  }
}
