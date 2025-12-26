import {isPlatformBrowser} from '@angular/common';
import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {Subject} from 'rxjs';

export enum UkLoggerColorScheme {
  TRACE = '#c07fe0',
  DEBUG = '#3bc1a3',
  INFO = '#51b1e2',
  LOG = '#d1d1d1',
  WARN = '#f9a6a6',
  ERROR = '#dc5a5a',
  FATAL = '#d30f0f',
}

export enum UkLoggerPart {
  INIT = 'INIT           ',
  REFRESH_TOKEN = 'REFRESH_TOKEN        ',
  NOM_OPEN_STREET = 'NOM_OPEN_STREET      ',
  LOCATION_SERVICE = 'LOCATION_SRV         ',
  GLOBAL_ERROR = 'GLOBAL_ERROR         ',
  INTERNET_CONNECTION = 'INTERNET-CON         ',
  AUDIO_SERVICE = 'AUDIO-SERVICE        ',
  LOADER = 'LOADER               ',
  SECURE_IMAGE = 'SECURE-IMAGE         ',
  ANIMATION_COMPONENT = 'ANIMATION-COMP       ',
  TOO_LATE = 'TOO-LATE             ',
  REQ_RETRYING = 'REQ-RETRYING         ',
  LOG_HTTP = 'LOG-HTTP             ',
  LOADER_INTERCEPTOR = 'LOADER-INT.          ',
  AUTH_GUARD = 'AUTH-GUARD           ',
  ERROR_HANDLER = 'ERROR-HANDLER        ',
  LOCAL_STORAGE = 'LOCAL_STORAGE        ',
  OTP_INPUT = 'OTP_INPUT            ',
  GENERAL_LAYOUT = 'GENERAL_LAYOUT       ',
  CONNECTIVITY_SERVICE = 'CONNECTIVITY_SERVICE ',
  GLOBAL_ERROR_HANDLER = 'GLOBAL_ERROR_HANDLER ',
}

const EXCLUDED_PARTS: UkLoggerPart[] = [
  // UkLoggerPart.INIT,
  // UkLoggerPart.REFRESH_TOKEN,
  // UkLoggerPart.NOM_OPEN_STREET,
  // UkLoggerPart.LOCATION_SERVICE,
  // UkLoggerPart.GLOBAL_ERROR,
  // UkLoggerPart.INTERNET_CONNECTION,
  // UkLoggerPart.AUDIO_SERVICE,
  // UkLoggerPart.LOADER,
  // UkLoggerPart.SECURE_IMAGE,
  // UkLoggerPart.ANIMATION_COMPONENT,
  // UkLoggerPart.TOO_LATE,
  // UkLoggerPart.REQ_RETRYING,
  // UkLoggerPart.LOG_HTTP,
  // UkLoggerPart.LOADER_INTERCEPTOR,
  // UkLoggerPart.AUTH_GUARD,
  // UkLoggerPart.ERROR_HANDLER,
  // UkLoggerPart.LOCAL_STORAGE,
];

export interface UkLogInfo {
  level: NgxLoggerLevel;
  message: string;
  info?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class UkLoggerService {
  private readonly nGXLogger = inject(NGXLogger);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly loggerSubject = new Subject<UkLogInfo>();
  public logger$ = this.loggerSubject.asObservable();

  public init(loggerLevel: NgxLoggerLevel): void {
    this.info(UkLoggerPart.INIT, `LOG LEVEL IS ${NgxLoggerLevel[loggerLevel]}`);
  }

  public trace(part: UkLoggerPart, message: string, info?: object): void {
    this.output(NgxLoggerLevel.TRACE, part, message, info);
  }

  public debug(part: UkLoggerPart, message: string, info?: object): void {
    this.output(NgxLoggerLevel.DEBUG, part, message, info);
  }

  public info(part: UkLoggerPart, message: string, info?: object): void {
    this.output(NgxLoggerLevel.INFO, part, message, info);
  }

  public log(part: UkLoggerPart, message: string, info?: object): void {
    this.output(NgxLoggerLevel.LOG, part, message, info);
  }

  public warn(part: UkLoggerPart, message: string, info?: object): void {
    this.output(NgxLoggerLevel.WARN, part, message, info);
  }

  public error(part: UkLoggerPart, message: string, info?: object): void {
    this.output(NgxLoggerLevel.ERROR, part, message, info);
  }

  public fatal(part: UkLoggerPart, message: string, info?: object): void {
    this.output(NgxLoggerLevel.FATAL, part, message, info);
  }

  private output(
    level: NgxLoggerLevel,
    part: UkLoggerPart,
    message: string,
    info?: object,
  ): void {
    if (!EXCLUDED_PARTS.includes(part) && isPlatformBrowser(this.platformId)) {
      const TEXT = `[${part.toUpperCase()}] ${message}`;

      switch (level) {
        case NgxLoggerLevel.TRACE:
          this.nGXLogger.trace(TEXT, info ?? '');
          break;
        case NgxLoggerLevel.DEBUG:
          this.nGXLogger.debug(TEXT, info ?? '');
          break;
        case NgxLoggerLevel.INFO:
          this.nGXLogger.info(TEXT, info ?? '');
          break;
        case NgxLoggerLevel.LOG:
          this.nGXLogger.log(TEXT, info ?? '');
          break;
        case NgxLoggerLevel.WARN:
          this.nGXLogger.warn(TEXT, info ?? '');
          break;
        case NgxLoggerLevel.ERROR:
          this.nGXLogger.error(TEXT, info ?? '');
          break;
        case NgxLoggerLevel.FATAL:
          this.nGXLogger.fatal(TEXT, info ?? '');
          break;
        case NgxLoggerLevel.OFF:
          break;
      }

      this.broadcast(level, TEXT, info);
    }
  }

  private broadcast(
    level: NgxLoggerLevel,
    message: string,
    info?: unknown,
  ): void {
    this.loggerSubject.next({
      level,
      message,
      info,
    });
  }
}
