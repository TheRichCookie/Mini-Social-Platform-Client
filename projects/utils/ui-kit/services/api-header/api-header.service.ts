import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { ConfigApiServices } from '@utils/ui-kit/definitions';
import {
  UkConfigApiBaseUrls,
  UkConfigApiServices,
  UkConfigApiVersions,
  UkOverlayStatus,
} from '@utils/ui-kit/definitions';

@Injectable({
  providedIn: 'root',
})
export class UkApiHeaderService {
  public init(config?: {
    apiHeaderVersion?: UkConfigApiVersions;
    apiBaseUrl?: UkConfigApiBaseUrls;
    apiService?: ConfigApiServices;
    overlayStatus?: UkOverlayStatus;
  }): HttpHeaders {
    let headers = new HttpHeaders();

    if (
      config?.apiHeaderVersion &&
      config?.apiHeaderVersion !== UkConfigApiVersions.NONE
    ) {
      headers = headers.set('mnx-apiversion', config.apiHeaderVersion);
    } else if (config?.apiHeaderVersion === UkConfigApiVersions.NONE) {
      headers = headers.delete('mnx-apiversion');
    } else {
      headers = headers.set('mnx-apiversion', UkConfigApiVersions.V2);
    }

    if (config?.apiBaseUrl) {
      headers = headers.set('x-api-base-Url', config.apiBaseUrl);
    } else {
      headers = headers.set('x-api-base-Url', UkConfigApiBaseUrls.COMMON);
    }

    if (config?.apiService) {
      headers = headers.set('x-api-service', config.apiService);
    } else {
      headers = headers.set('x-api-service', UkConfigApiServices.AUTH);
    }

    if (config?.overlayStatus) {
      headers = headers.set('x-api-overlay', config.overlayStatus);
    } else {
      headers = headers.set('x-api-overlay', UkOverlayStatus.BOTH);
    }

    return headers;
  }
}
