import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    standalone: true,
    selector: 'bcs-errors',
    imports: [RouterModule],
    templateUrl: './errors.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './errors.component.scss',
})
export class BcsErrorsComponent {}
