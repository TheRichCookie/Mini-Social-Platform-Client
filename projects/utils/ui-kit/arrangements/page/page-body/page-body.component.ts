import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    standalone: true,
    selector: 'uk-page-body',
    imports: [CommonModule],
    templateUrl: './page-body.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './page-body.component.scss',
})
export class UkPageBodyComponent {
    @Input()
    public fullHeight = false;
}
