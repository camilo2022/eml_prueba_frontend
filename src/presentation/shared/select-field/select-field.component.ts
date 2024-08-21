import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-select-field',
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './select-field.component.html',
  styleUrls: ['../../../styles.css', './select-field.component.scss'],
})
export class SelectFieldComponent implements OnInit {
  @Input() options?: { label: string | number; value: string | number }[];

  ngOnInit() {
    if (this.options) {
      console.log(this.options);
    }
  }
}
