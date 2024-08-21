import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  standalone: true,
  imports: [MatIcon, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {
  @Input() text = 'Aceptar';
  @Input() disabled = false;
  @Input() onClick: (data?: any) => void = (data?: any) => {};
  @Input() className = '';
  @Input() icon = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconClass = '';

  constructor() {}
}
