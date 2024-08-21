import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InputType, ValueChangeEvent } from './input-field.types';

@Component({
  standalone: true,
  selector: 'app-input-field',
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['../../../styles.css', './input-field.component.scss'],
})
export class InputFieldComponent {
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
}
