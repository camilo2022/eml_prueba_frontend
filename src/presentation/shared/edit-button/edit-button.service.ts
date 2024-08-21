import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditButtonService {
  private editButtonActiveSource = new BehaviorSubject<{ index: number, item?: any } | null>(null);
  editButtonActive$ = this.editButtonActiveSource.asObservable();

  setEditButtonActive(data: { index: number, item?: any }) {
    const { index, item } = data;
    this.editButtonActiveSource.next({ index, item });
  }

  clearEditButtonActive() {
    this.editButtonActiveSource.next(null);
  }

  getEditButtonActive() {
    return this.editButtonActiveSource.getValue();
  }
}
