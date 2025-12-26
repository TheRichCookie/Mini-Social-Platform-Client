import { inject, Injectable } from '@angular/core';

import { UkAudioService } from '../audio.service';
import { sprite } from './sound-effects.const';
import type { SoundEffects } from './sound-effects.enum';

@Injectable({
  providedIn: 'root',
})
export class UkSoundEffectsService {
  private readonly audioService = inject(UkAudioService);
  constructor() {
    this.audioService.loadSound(
      'soundEffects',
      ['uk-sounds/sounds.webm', 'uk-sounds/sounds.mp3'],
      sprite,
    );
  }

  public play(soundEffects: SoundEffects): void {
    this.audioService.play('soundEffects', soundEffects);
  }

  public pause(_soundEffects: SoundEffects): void {
    this.audioService.pause('soundEffects');
  }
}
