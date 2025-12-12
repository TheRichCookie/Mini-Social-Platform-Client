import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: true,
    selector: 'bcs-e500-internal-server-error',
    imports: [],
    templateUrl: './e500-internal-server-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './e500-internal-server-error.component.scss',
})
export class BcsE500InternalServerErrorComponent {}
