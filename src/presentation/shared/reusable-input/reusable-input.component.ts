import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InputType,ValueChangeEvent } from '../input-field/input-field.types';

@Component({
  selector: 'app-reusable-input',
  standalone: true,
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './reusable-input.component.html',
  styleUrl: './reusable-input.component.scss'
})
export class ReusableInputComponent {

  @Input() type: InputType = 'number';
  @Input() name = '';
  @Input() value: string | number = '';
  @Input() placeholder = '0';
  @Input() maxLength = 100;
  @Input() onlyView = false;
  @Input() fieldName = '';
  @Input() fieldID: string | number = '';

  @Output() onChangeNumber: EventEmitter<ValueChangeEvent> = new EventEmitter();

  public changeValue(value: number | Event) {
    if (this.type === 'number' && !(value instanceof Event)) {
      const oldValue = Number(this.value);
      this.value = Number(this.value) + value;
      this.onChangeNumber.emit({
        oldValue,
        currentValue: this.value,
        fieldName: this.fieldName,
        fieldID: this.fieldID,
      });
    } else if (this.type === 'number' && value instanceof Event) {
      const target = value.target as HTMLInputElement;
      const oldValue = Number(this.value);
      this.value = Number(target.value);
      this.onChangeNumber.emit({
        oldValue,
        currentValue: this.value,
        fieldName: this.fieldName,
        fieldID: this.fieldID,
      });
    }
  }

  public changeValuePorcentage(value: number | Event) {
    if (this.type === 'porcentage' && !(value instanceof Event)) {
      const oldValue = Number((this.value as string).replace('%', ''));

      this.onChangeNumber.emit({
        oldValue,
        currentValue: Number((this.value as string).replace('%', '')) + value,
        fieldName: this.fieldName,
        fieldID: this.fieldID,
      });
    } else if (this.type === 'porcentage' && value instanceof Event) {
      const target = value.target as HTMLInputElement;
      const oldValue = Number((this.value as string).replace('%', ''));
      this.onChangeNumber.emit({
        oldValue,
        currentValue: Number(target.value.replace('%', '')),
        fieldName: this.fieldName,
        fieldID: this.fieldID,
      });
    }
  }

  formatWithThousandSeparator(value: number | string): string {
    if (value == null) return '';

    const [integerPart, decimalPart] = parseFloat(value.toString()).toFixed(2).split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedIntegerPart},${decimalPart}`;
  }

}
