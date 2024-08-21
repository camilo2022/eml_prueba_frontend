import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MaterialModule } from "../material/material.module";

@Component({
  selector: 'app-actions-buttons',
  templateUrl: './actions-buttons.component.html',
  styleUrls: ['./actions-buttons.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class ActionsButtonsComponent {
  @Input() onClick: (data: { clicked: 'edit' | 'remove' }) => void = () => { };
  @Input() editButton = false;
  @Input() removeButton = false;

  constructor() { }

  emitEdit() {
    console.log('emitEdit')
    this.onClick({clicked: 'edit'});
  }

  emitRemove() {
    console.log('emitRemove')
    this.onClick({clicked: 'remove'});
  }
}