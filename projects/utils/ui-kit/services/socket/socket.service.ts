import { inject, Injectable } from '@angular/core';
import {
  UkAuthenticateService,
  UkJwtService,
  UkLoggerPart,
  UkLoggerService,
} from '@utils/ui-kit/services';
import { GENERAL_TOKEN } from '@utils/ui-kit/settings';
import { jwtDecode } from 'jwt-decode';
import type { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export interface UkSocketNotification {
  type: string;
  senderId?: string;
  postId?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class UkSocketService {
  private socket?: Socket;
  private readonly connectedSubject$ = new BehaviorSubject<boolean>(false);
  private readonly notificationSubject$ = new Subject<UkSocketNotification>();

  private readonly authenticateService = inject(UkAuthenticateService);
  private readonly jwtService = inject(UkJwtService);
  private readonly logger = inject(UkLoggerService);
  private readonly API_CONFIG = inject(GENERAL_TOKEN);

  public readonly notification$: Observable<UkSocketNotification> =
    this.notificationSubject$.asObservable();

  public readonly connected$: Observable<boolean> =
    this.connectedSubject$.asObservable();

  public connect(): void {
    if (this.socket) return;

    const base = String(this.API_CONFIG.baseUrl?.common || '');
    const server = base.replace(/\/?api\/?$/i, '') || base;

    try {
      this.socket = io(server, {
        auth: { token: this.authenticateService.token },
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        this.connectedSubject$.next(true);
        this.joinUserRoom();
      });

      this.socket.on('disconnect', () => {
        this.connectedSubject$.next(false);
      });

      this.socket.on('notification', (payload: UkSocketNotification) => {
        this.notificationSubject$.next(payload);
      });

      // react to token changes (join room or disconnect)
      this.authenticateService.onTokenChange$.subscribe((token) => {
        if (token) {
          this.joinUserRoom();
        } else {
          this.disconnect();
        }
      });

      this.authenticateService.onLogOutChangeStatus$.subscribe((status) => {
        if (status) this.disconnect();
      });
    } catch (error) {
      this.logger.error(
        UkLoggerPart.GLOBAL_ERROR,
        'UkSocketService connect',
        error as any,
      );
    }
  }

  private joinUserRoom(): void {
    if (!this.socket) return;

    const token = this.authenticateService.token;

    if (!token) return;

    try {
      const decoded: any = jwtDecode(token as string);
      const userId = decoded?.id || decoded?._id || decoded?.userId;

      if (userId) {
        this.socket.emit('join', String(userId));
      }
    } catch (error) {
      this.logger.error(
        UkLoggerPart.GLOBAL_ERROR,
        'UkSocketService joinUserRoom',
        error as any,
      );
    }
  }

  public disconnect(): void {
    try {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = undefined;
      }

      this.connectedSubject$.next(false);
    } catch (error) {
      this.logger.error(
        UkLoggerPart.GLOBAL_ERROR,
        'UkSocketService disconnect',
        error as any,
      );
    }
  }
}
