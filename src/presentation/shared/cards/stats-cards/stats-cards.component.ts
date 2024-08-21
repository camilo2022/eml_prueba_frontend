import { Component, Input, OnInit } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../components/table/table.component';
import { MatIcon } from '@angular/material/icon';

type HexColor = `#${string}`;

@Component({
  standalone: true,
  selector: 'app-stats-card',
  imports: [
    FormsModule,
    NgbPaginationModule,
    CommonModule,
    TableComponent,
    MatIcon,
  ],
  templateUrl: './stats-cards.component.html',
  styleUrls: ['../../../../styles.css', './stats-cards.component.scss'],
})
export class StatsCardComponent {
  @Input() colorHex: HexColor = '#000000';
  @Input() label = 'SMMLV 2023';
  @Input() count = 0;
  constructor() {}

  public data: any[] = [];

  formatNumber(amount: number): string {
    return amount.toLocaleString('de-DE');
  }
}
