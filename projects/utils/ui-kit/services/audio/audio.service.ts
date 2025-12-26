// src/app/services/audio.service.ts

import { inject, Injectable } from '@angular/core';
import type { SoundSpriteDefinitions } from 'howler';
import { Howl, Howler } from 'howler';

import {
  UkLoggerPart,
  UkLoggerService,
} from '../../services/logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class UkAudioService {
  private readonly loggerService = inject(UkLoggerService);
  private sounds: Record<string, Howl> = {};

  public loadSound(
    key: string,
    url: string[],
    sprite?: SoundSpriteDefinitions,
  ): void {
    this.sounds[key] = new Howl({
      src: url,
      autoplay: false,
      loop: false,
      preload: true,
      volume: 0.5,
      html5: true, // Set to true for streaming audio
      sprite,
      onload: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'Sound loaded');
      },
      onloaderror: (id: number, error: unknown) => {
        this.loggerService.error(
          UkLoggerPart.AUDIO_SERVICE,
          'sound load error',
          [id, error],
        );
      },
      onplay: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound played');
      },
      onplayerror: (id: number, error: unknown) => {
        this.loggerService.error(
          UkLoggerPart.AUDIO_SERVICE,
          'sound playing error',
          [id, error],
        );
      },
      onpause: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound paused');
      },
      onstop: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound stopped');
      },
      onmute: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound muted');
      },
      onvolume: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound volumed');
      },
      onrate: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound rated');
      },
      onseek: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound seeked');
      },
      onfade: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound faded');
      },
      onunlock: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'sound unlocked');
      },
      onend: () => {
        this.loggerService.info(UkLoggerPart.AUDIO_SERVICE, 'Sound ended');
      },
    });
  }

  public play(key: string, spriteKey?: string): void {
    if (this.sounds[key]) {
      this.sounds[key].play(spriteKey);
    }
  }

  public pause(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].pause();
    }
  }

  public stop(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].stop();
    }
  }

  public mute(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].mute();
    }
  }

  public fade(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].fade(1, 0, 1000);
    }
  }

  //  0.5 to 4.0, with 1.0 being normal speed.
  public rate(key: string, speed: number): void {
    if (this.sounds[key]) {
      this.sounds[key].rate(speed);
    }
  }

  public loop(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].loop(1);
    }
  }

  public state(key: string): 'loaded' | 'loading' | 'unloaded' | null {
    if (this.sounds[key]) {
      return this.sounds[key].state();
    }

    return null;
  }

  public playing(key: string): boolean {
    if (this.sounds[key]) {
      return this.sounds[key].playing();
    }

    return false;
  }

  public duration(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].duration(1);
    }
  }

  public load(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].load();
    }
  }

  public unload(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].unload();
    }
  }

  public setVolume(key: string, volume: number): void {
    if (this.sounds[key]) {
      this.sounds[key].volume(volume);
    } else {
      console.warn(`Sound not found: ${key}`);
    }
  }

  public getVolume(key: string): number | null {
    if (this.sounds[key]) {
      return this.sounds[key].volume();
    }

    console.warn(`Sound not found: ${key}`);

    return null;
  }

  public setGlobalVolume(volume: number): void {
    Howler.volume(volume);
  }

  public getGlobalVolume(): number {
    return Howler.volume();
  }

  public preloadSounds(sounds: Record<string, string>): void {
    Object.entries(sounds).forEach(([key, url]) => {
      this.loadSound(key, [url]);
    });
  }
}
