import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UkStarFieldComponent} from '@ui-kit/core/components';
import VERSION from 'src/app.version';

@Component({
    selector: 'hang-root',
    imports: [UkStarFieldComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangAppComponent {
    public readonly VERSION = VERSION;
    public readonly TITLE = 'hangout-app';
}
