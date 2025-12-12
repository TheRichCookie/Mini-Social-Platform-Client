import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: true,
    selector: 'uk-inner-page-wrapper',
    imports: [],
    templateUrl: './inner-page-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './inner-page-wrapper.component.scss',
})
export class UkInnerPageWrapperComponent {}
