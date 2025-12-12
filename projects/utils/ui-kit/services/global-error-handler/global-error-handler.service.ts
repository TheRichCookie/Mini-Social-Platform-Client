/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ErrorHandler} from '@angular/core';
import {inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {UkLoggerPart, UkLoggerService} from '../logger/logger.service';

export interface UkCustomError {
  message: string;
  status?: number;
  timestamp?: Date;
  path?: string;
  error?: object;
}

@Injectable({
  providedIn: 'root',
})
export class UkGlobalErrorHandlerService implements ErrorHandler {
  private readonly loggerService = inject(UkLoggerService);
  public errorNotifier$ = new Subject<UkCustomError>();

  public handleError(error: unknown): void {
    const CUSTOM_ERROR: UkCustomError = this.formatError(error);

    this.loggerService.error(
      UkLoggerPart.GLOBAL_ERROR_HANDLER,
      CUSTOM_ERROR.message,
      [[error]],
    );

    this.errorNotifier$.next(CUSTOM_ERROR);

    // Log the error to the console (or send it to a server)
    // console.error('Custom Error: ', customError);

    // Optionally: Rethrow the error if you want Angular to handle it
    throw error;
  }

  private formatError(error: any): UkCustomError {
    console.log('GLOBAL_ERROR_HANDLER', error);

    return {
      message: error.message ?? 'An unknown error occurred.',
      status: error.status ?? null,
      timestamp: new Date(),
      path: error.url ?? '',
      error: error ?? null!,
    };
  }
}
