import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'uk-button',
    imports: [],
    templateUrl: './uk-button.component.html',
    styleUrl: './uk-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkButtonComponent {
    @Input()
    public text = '';
}
