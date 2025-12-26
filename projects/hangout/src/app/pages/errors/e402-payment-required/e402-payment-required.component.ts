import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'bcs-e402-payment-required',
  imports: [],
  templateUrl: './e402-payment-required.component.html',
  styleUrl: './e402-payment-required.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BcsE402PaymentRequiredComponent {}
