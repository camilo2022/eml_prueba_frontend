import { Component, EventEmitter, Output } from '@angular/core';
import { EditButtonService } from './edit-button.service';
import { ModalService } from '../../../data/services/modal.service';
import { EditYearModalComponent } from '../../components/modals/edit-year/edit-yearcomponent';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
})
export class EditButtonComponent {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  constructor(
    private editButtonService: EditButtonService,
    private modal$: ModalService
  ) {}

  emitEdit(): void {
    const data = this.editButtonService.getEditButtonActive();
    this.modal$.open(EditYearModalComponent, {
      item: data?.item,
      edited: (data: any) => {
        console.log(data);
      },
    });
  }
}
