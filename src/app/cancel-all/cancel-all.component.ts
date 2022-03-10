import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-all',
  templateUrl: './cancel-all.component.html',
  styleUrls: ['./cancel-all.component.css']
})
export class CancelAllComponent {
  @Output() cancelAll: EventEmitter<any> = new EventEmitter();

  onCancelAll(): void {
    this.cancelAll.emit();
  }
}
