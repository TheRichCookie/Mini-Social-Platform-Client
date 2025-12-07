import type {OnDestroy, OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component} from '@angular/core';

import type {UkStar} from './star-field.interface';

@Component({
    selector: 'uk-star-field',
    imports: [],
    templateUrl: './star-field.component.html',
    styleUrl: './star-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkStarFieldComponent implements OnInit, OnDestroy {
    public stars: UkStar[] = [];
    public starCount = 100;

    public ngOnInit(): void {
        for (let i = 0; i < this.starCount; i++) {
            const distanceFactor = Math.random();
            const duration = 40 - distanceFactor * 20;
            const size = 1 + distanceFactor * 3;
            const opacity = 0.3 + distanceFactor * 0.7;
            // const top = Math.random() * 100;
            const randomCyclePoint = Math.random();

            // The negative delay is used to jump the animation ahead
            // by a random fraction of its total duration.
            const negativeDelay = randomCyclePoint * duration;

            this.stars.push({
                id: i,
                left: `${Math.random() * 100}%`,
                duration: `${duration}s`,
                delay: `-${negativeDelay}s`,
                size: `${size}px`,
                baseOpacity: opacity,
                // initialTop: `${top}%`,
            });
        }
    }

    public ngOnDestroy(): void {
        this.stars = [];
    }
}
